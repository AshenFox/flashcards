import { axiosInstance } from "@flashcards/common";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getCurrentSubscription,
  registerServiceWorker,
  subscribeToPush,
} from "./helpers";
import { CurrentSubscription, Permission, Subscription } from "./types";

type PushNotificationsContextType = {
  subscriptions: Subscription[];
  currentSubscription: CurrentSubscription | null;
  registration: ServiceWorkerRegistration | null;
  permission: Permission | null;
  isLoading: boolean;
  pushPrepared: boolean;
  handleDelete: (id: string) => Promise<void>;
  handleRename: (id: string, newName: string) => Promise<void>;
  handleSubscribe: () => Promise<void>;
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
};

const PushNotificationsContext =
  createContext<PushNotificationsContextType | null>(null);

export const usePushNotifications = () => {
  const context = useContext(PushNotificationsContext);
  if (!context)
    throw new Error(
      "usePushNotifications must be used within a PushNotificationsProvider",
    );

  return context;
};

export const PushNotificationsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isSubscriptionsLoading, setIsSubscriptionsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const isLoading = isSubscriptionsLoading || isDeleting || isSubscribing;

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [currentSubscription, setCurrentSubscription] =
    useState<CurrentSubscription | null>(null);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [permission, setPermission] = useState<Permission | null>(null);
  const [pushPrepared, setPushPrepared] = useState(false);

  const updatePermission = useCallback((status: PermissionStatus) => {
    setPermission({ status, state: status.state });
  }, []);

  useEffect(() => {
    if (!subscriptions) return;
    getCurrentSubscription(subscriptions, registration).then(res => {
      setCurrentSubscription(res);
    });
  }, [subscriptions, registration]);

  const loadSubscriptions = useCallback(async () => {
    try {
      setIsSubscriptionsLoading(true);
      const response = await axiosInstance.get(
        "/api/notifications/subscriptions",
      );
      setSubscriptions(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubscriptionsLoading(false);
    }
  }, []);

  const preparePush = useCallback(async () => {
    const registration = await registerServiceWorker();
    setRegistration(registration);

    const permission = await navigator.permissions.query({
      name: "notifications",
    });
    updatePermission(permission);

    await loadSubscriptions();
    setPushPrepared(true);
  }, [loadSubscriptions, updatePermission]);

  useEffect(() => {
    preparePush();
  }, [preparePush]);

  const handleSubscribe = useCallback(async () => {
    if (!registration) return;
    setIsSubscribing(true);
    await subscribeToPush(registration);
    await loadSubscriptions();
    setIsSubscribing(false);
  }, [registration, loadSubscriptions]);

  const handleDelete = useCallback(
    async (id: string) => {
      setIsDeleting(true);
      try {
        await axiosInstance.delete(`/api/notifications/subscription/${id}`);
        await loadSubscriptions();

        if (currentSubscription?.data._id === id) {
          await currentSubscription?.subscription.unsubscribe();
          setCurrentSubscription(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsDeleting(false);
      }
    },
    [currentSubscription, loadSubscriptions],
  );

  const handleRename = useCallback(async (id: string, newName: string) => {
    try {
      await axiosInstance.put(`/api/notifications/subscription/${id}`, {
        name: newName,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (!permission) return;

    const onChange = (e: Event) => {
      const permission = e.target as PermissionStatus;
      const state = permission.state;

      updatePermission(permission);

      if (state === "denied" || state === "prompt")
        handleDelete(currentSubscription?.data._id);
    };

    permission?.status.addEventListener("change", onChange);

    return () => {
      permission?.status.removeEventListener("change", onChange);
    };
  }, [permission, currentSubscription, handleDelete, updatePermission]);

  const value = useMemo(
    () => ({
      subscriptions,
      currentSubscription,
      registration,
      permission,
      isLoading,
      pushPrepared,
      handleDelete,
      handleRename,
      handleSubscribe,
      setSubscriptions,
    }),
    [
      subscriptions,
      currentSubscription,
      registration,
      permission,
      isLoading,
      pushPrepared,
      handleDelete,
      handleRename,
      handleSubscribe,
      setSubscriptions,
    ],
  );

  return (
    <PushNotificationsContext.Provider value={value}>
      {children}
    </PushNotificationsContext.Provider>
  );
};
