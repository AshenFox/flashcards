import { axiosInstance } from "@flashcards/common";
import { useAppSelector } from "@store/hooks";
import { memo, useCallback, useEffect, useState } from "react";

import Subscriptions from "./components/Subscriptions";
import {
  getCurrentSubscription,
  registerServiceWorker,
  subscribeToPush,
} from "./helpers";
import { CurrentSubscription, Permission, Subscription } from "./types";

const PushNotifications = () => {
  const user = useAppSelector(state => state.auth.user);

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
  }, [loadSubscriptions, updatePermission]);

  useEffect(() => {
    if (!user) return;
    preparePush();
  }, [preparePush, user]);

  const handleSubscribe = useCallback(async () => {
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

  return (
    <Subscriptions
      subscriptions={subscriptions}
      currentSubscription={currentSubscription}
      registration={registration}
      permission={permission}
      onDelete={handleDelete}
      onRename={handleRename}
      onSubscribe={handleSubscribe}
      setSubscriptions={setSubscriptions}
      isLoading={isLoading}
    />
  );
};

export default memo(PushNotifications);
