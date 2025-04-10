import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { axiosInstance } from "@flashcards/common";
import flashcardsConfig from "@flashcards/config";
import { useIsMounted } from "@helpers/hooks/useIsMounted";
import { useUserThemePreference } from "@helpers/hooks/useUserThemePreference";
import { useAppSelector } from "@store/hooks";
import { DeleteIcon, MoonIcon, SunIcon } from "@ui/Icons";
import Input from "@ui/Input";
import { Button, Link } from "@ui/InteractiveElement";
import Spinner from "@ui/Spinner";
import clsx from "clsx";
import { useTheme } from "next-themes";
import React, {
  ChangeEvent,
  memo,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import s from "./styles.module.scss";

type Subscription = {
  _id: string;
  name: string;
  subscriptionDate: Date;
  subscriptionData: {
    endpoint: string;
    keys: {
      p256dh: string;
      auth: string;
    };
  };
};

type Permission = {
  status: PermissionStatus;
  state: PermissionState;
};

type CurrentSubscription = {
  data: Subscription;
  subscription: PushSubscription;
} | null;

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();
  const preference = useUserThemePreference();

  const user = useAppSelector(state => state.auth.user);

  const [isSubscriptionsLoading, setIsSubscriptionsLoading] = useState(true);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const generalLoading = isSubscriptionsLoading || isSubscribing || isDeleting;
  const controlsActive = !generalLoading;

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
  }, [user, preparePush]);

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

  const timers = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const onNameChange = useCallback(
    (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setSubscriptions(prev => {
        const newSubscriptions = prev.map(sub => {
          if (sub._id === id) return { ...sub, name: e.target.value };
          return sub;
        });

        return newSubscriptions;
      });

      clearTimeout(timers.current[id]);

      timers.current[id] = setTimeout(() => {
        handleRename(id, e.target.value);
      }, 300);
    },
    [handleRename],
  );

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

  const changeTheme: MouseEventHandler = () => {
    if (theme === "system") {
      setTheme(preference === "dark" ? "light" : "dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const otherSubscriptions = useMemo(
    () =>
      subscriptions.filter(sub => sub._id !== currentSubscription?.data._id),
    [subscriptions, currentSubscription],
  );

  return (
    <ContentWrapper tagType="main">
      <Container>
        <div className={s.settings}>
          <div className={s.header}>
            <h1 className={s.title}>Settings</h1>
            <Link href={"/home/modules"}>Return</Link>
          </div>
          <div className={clsx(s.section, s.theme)}>
            <h2>Theme</h2>
            <div className={s.body}>
              {isMounted && (
                <Button
                  onClick={changeTheme}
                  design={"plain"}
                  icon={theme === "dark" ? <SunIcon /> : <MoonIcon />}
                  iconSize={25}
                >
                  {theme === "dark" ||
                  (theme === "system" && preference === "dark")
                    ? "light"
                    : "dark"}
                </Button>
              )}
            </div>
          </div>
          <div className={clsx(s.section, s.notifications)}>
            <h2>Push Notifications</h2>

            <div className={s.body}>
              <div className={s.subscriptions}>
                {generalLoading && (
                  <Spinner variant="secondary" className={s.loader} />
                )}

                <h3>Current Device</h3>
                {currentSubscription && (
                  <div className={s.subscription}>
                    <Input
                      value={currentSubscription.data.name}
                      onChange={onNameChange(currentSubscription.data._id)}
                      className={s.input}
                      disabled={generalLoading}
                    />
                    <Button
                      className={s.delete}
                      onClick={() => handleDelete(currentSubscription.data._id)}
                      design="plain"
                      icon={<DeleteIcon />}
                      active={controlsActive}
                    />
                  </div>
                )}
                {!currentSubscription &&
                  registration?.active?.state === "activated" &&
                  (permission?.state === "granted" ||
                    permission?.state === "prompt") && (
                    <div className={s.subscription}>
                      <Button
                        onClick={handleSubscribe}
                        active={controlsActive}
                        className={s.enable}
                      >
                        Enable Notifications
                      </Button>
                    </div>
                  )}
                {permission?.state === "denied" && (
                  <div className={clsx(s.subscription, s.noPermission)}>
                    <span>No permission</span>
                  </div>
                )}

                {!!otherSubscriptions.length && (
                  <>
                    <h3>Other Devices</h3>
                    {otherSubscriptions.map(sub => {
                      return (
                        <div key={sub._id} className={s.subscription}>
                          <Input
                            value={sub.name}
                            onChange={onNameChange(sub._id)}
                            className={s.input}
                            disabled={generalLoading}
                          />
                          <Button
                            className={s.delete}
                            onClick={() => handleDelete(sub._id)}
                            design="plain"
                            icon={<DeleteIcon />}
                            active={controlsActive}
                          />
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </ContentWrapper>
  );
};

export default memo(Settings);

export const urlBase64ToUint8Array = (base64String: string) => {
  // Remove any whitespace and ensure proper base64 format
  const base64 = base64String.trim();

  // Add padding if needed
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const base64WithPadding = base64 + padding;

  // Convert to URL-safe base64
  const urlSafeBase64 = base64WithPadding.replace(/-/g, "+").replace(/_/g, "/");

  try {
    // Try using atob first
    const rawData = window.atob(urlSafeBase64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  } catch (err) {
    console.error(err);
  }
};

const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  const browser = userAgent.match(
    /(chrome|safari|firefox|msie|edge|opera)\/?\s*([\d.]+)/i,
  );
  const os = userAgent.match(/(windows|macintosh|linux|android|ios)/i);
  const platform = navigator.platform;

  return {
    browser: browser ? `${browser[1]} ${browser[2]}` : "Unknown Browser",
    os: os ? os[1] : "Unknown OS",
    platform: platform || "Unknown Platform",
  };
};

export const registerServiceWorker = async () => {
  try {
    if (!("serviceWorker" in navigator))
      throw new Error("Service Worker not supported");

    const registration =
      await navigator.serviceWorker.register("/scripts/Worker.js");
    return registration;
  } catch (err) {
    console.error(err);
  }

  return null;
};

export const subscribeToPush = async (
  registration: ServiceWorkerRegistration,
) => {
  if (!("serviceWorker" in navigator))
    throw new Error("Service Worker not supported");

  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        flashcardsConfig.publicVapidKey,
      ),
    });

    const { browser, os, platform } = getBrowserInfo();
    const subscriptionName = `${browser} on ${os} (${platform})`;

    await axiosInstance.post("/api/notifications/subscribe", {
      name: subscriptionName,
      subscriptionData: subscription.toJSON(),
    });

    return subscription;
  } catch (err) {
    console.error(err);
  }
};

export const getCurrentSubscription = async (
  subscriptions?: Subscription[],
  registration?: ServiceWorkerRegistration | null,
) => {
  let currentSubscription: CurrentSubscription = null;

  if (!registration || !subscriptions || subscriptions.length === 0)
    return currentSubscription;

  try {
    const subscription = await registration.pushManager.getSubscription();

    const data = subscriptions.find(
      sub => sub.subscriptionData.endpoint === subscription?.endpoint,
    );

    if (data && subscription) {
      currentSubscription = {
        data: data,
        subscription,
      };
    }
  } catch (err) {
    console.error(err);
  }

  return currentSubscription;
};
