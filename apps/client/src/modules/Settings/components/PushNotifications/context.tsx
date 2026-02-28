import {
  deleteNotificationsSubscription,
  getNotificationsSubscriptions,
  updateNotificationsSubscription,
} from "@api/methods";
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
  handleSubscribe: () => Promise<void>;
  handleRename: (
    id: string,
    updates: Partial<Pick<Subscription, "name">>,
  ) => void;
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

  const [subscriptions, setLocalSubscriptions] = useState<Subscription[]>([]);
  const [pushSubscription, setPushSubscription] =
    useState<PushSubscription | null>(null);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [permission, setPermission] = useState<Permission | null>(null);
  const [pushPrepared, setPushPrepared] = useState(false);

  const currentSubscription = useMemo<CurrentSubscription | null>(() => {
    const data = subscriptions.find(
      sub => sub.subscriptionData.endpoint === pushSubscription?.endpoint,
    );

    if (pushSubscription && data) {
      return {
        data,
        subscription: pushSubscription,
      };
    }

    return null;
  }, [pushSubscription, subscriptions]);

  const currentSubscriptionRef = useRef(currentSubscription);
  currentSubscriptionRef.current = currentSubscription;

  const {
    data: subscriptionsData,
    isLoading: isSubscriptionsDataLoading,
    refetch: refetchSubscriptions,
  } = useQuery({
    queryKey,
    queryFn: getNotificationsSubscriptions,
    enabled: false,
    initialData: [],
  });

  const isLoading = isSubscriptionsDataLoading || isDeleting || isSubscribing;

  const updatePermission = useCallback((status: PermissionStatus) => {
    setPermission({ status, state: status.state });
  }, []);

  useEffect(() => {
    if (subscriptionsData) setLocalSubscriptions(subscriptionsData);
  }, [subscriptionsData]);

  useEffect(() => {
    getCurrentSubscription(registration)
      .then(res => {
        if (res !== pushSubscription) setPushSubscription(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, [subscriptions, pushSubscription, registration]);

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
        await deleteNotificationsSubscription(id);
        await refetchSubscriptions();

        const subscription = currentSubscriptionRef.current;
        if (subscription?.data._id === id) {
          await subscription.subscription.unsubscribe();
          setPushSubscription(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsDeleting(false);
      }
    },
    [refetchSubscriptions],
  );

  const renameSubscription = useCallback(
    async (id: string, newName: string) => {
      try {
        await updateNotificationsSubscription(id, { name: newName });
      } catch (err) {
        console.error(err);
        await refetchSubscriptions();
      }
    },
    [refetchSubscriptions],
  );

  const renameTimersRef = useRef<Record<string, NodeJS.Timeout>>({});

  const handleRename = useCallback(
    (id: string, updates: Partial<Pick<Subscription, "name">>) => {
      setLocalSubscriptions(prev =>
        prev.map(sub => (sub._id === id ? { ...sub, ...updates } : sub)),
      );

      if (updates.name !== undefined) {
        clearTimeout(renameTimersRef.current[id]);
        renameTimersRef.current[id] = setTimeout(() => {
          renameSubscription(id, updates.name as string);
          delete renameTimersRef.current[id];
        }, 300);
      }
    },
    [renameSubscription],
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
      handleSubscribe,
      handleRename,
    }),
    [
      subscriptions,
      currentSubscription,
      registration,
      permission,
      isLoading,
      pushPrepared,
      handleDelete,
      handleSubscribe,
      handleRename,
    ],
  );

  return (
    <PushNotificationsContext.Provider value={value}>
      {children}
    </PushNotificationsContext.Provider>
  );
};
