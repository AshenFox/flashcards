import { axiosInstance } from "@flashcards/common";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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

const queryKey = ["notifications", "subscriptions"];

export const PushNotificationsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const [currentSubscription, setCurrentSubscription] =
    useState<CurrentSubscription | null>(null);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [permission, setPermission] = useState<Permission | null>(null);
  const [pushPrepared, setPushPrepared] = useState(false);

  const currentSubscriptionRef = useRef(currentSubscription);
  currentSubscriptionRef.current = currentSubscription;

  const {
    data: subscriptions,
    isLoading: isSubscriptionsLoading,
    refetch: refetchSubscriptions,
  } = useQuery({
    queryKey,
    queryFn: async () =>
      (
        await axiosInstance.get<Subscription[]>(
          "/api/notifications/subscriptions",
        )
      ).data,
    enabled: false,
    initialData: [],
  });

  const isLoading = isSubscriptionsLoading || isDeleting || isSubscribing;

  const updatePermission = useCallback((status: PermissionStatus) => {
    setPermission({ status, state: status.state });
  }, []);

  useEffect(() => {
    if (!subscriptions) return;
    getCurrentSubscription(subscriptions, registration)
      .then(res => {
        setCurrentSubscription(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, [subscriptions, registration]);

  const preparePush = useCallback(async () => {
    try {
      const registration = await registerServiceWorker();
      setRegistration(registration);

      if (!registration) return;

      const permission = await navigator.permissions.query({
        name: "notifications",
      });
      updatePermission(permission);

      await refetchSubscriptions();
    } catch (err) {
      console.error(err);
    } finally {
      setPushPrepared(true);
    }
  }, [refetchSubscriptions, updatePermission]);

  useEffect(() => {
    preparePush();
  }, [preparePush]);

  const handleSubscribe = useCallback(async () => {
    if (!registration) return;
    setIsSubscribing(true);
    try {
      await subscribeToPush(registration);
      await refetchSubscriptions();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubscribing(false);
    }
  }, [registration, refetchSubscriptions]);

  const handleDelete = useCallback(
    async (id: string) => {
      setIsDeleting(true);
      try {
        await axiosInstance.delete(`/api/notifications/subscription/${id}`);
        await refetchSubscriptions();

        const subscription = currentSubscriptionRef.current;
        if (subscription?.data._id === id) {
          await subscription.subscription.unsubscribe();
          setCurrentSubscription(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsDeleting(false);
      }
    },
    [refetchSubscriptions],
  );

  const handleRename = useCallback(
    async (id: string, newName: string) => {
      try {
        await axiosInstance.put(`/api/notifications/subscription/${id}`, {
          name: newName,
        });
      } catch (err) {
        console.error(err);
        await refetchSubscriptions();
      }
    },
    [refetchSubscriptions],
  );

  useEffect(() => {
    if (!permission) return;

    const onChange = (e: Event) => {
      const permissionStatus = e.target as PermissionStatus;
      const state = permissionStatus.state;

      updatePermission(permissionStatus);

      const subscriptionId = currentSubscriptionRef.current?.data?._id;
      if ((state === "denied" || state === "prompt") && subscriptionId)
        handleDelete(subscriptionId);
    };

    permission.status?.addEventListener("change", onChange);

    return () => {
      permission.status?.removeEventListener("change", onChange);
    };
  }, [permission, updatePermission, handleDelete]);

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
    ],
  );

  return (
    <PushNotificationsContext.Provider value={value}>
      {children}
    </PushNotificationsContext.Provider>
  );
};
