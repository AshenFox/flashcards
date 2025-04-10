import { axiosInstance } from "@flashcards/common";
import flashcardsConfig from "@flashcards/config";

import { CurrentSubscription, Subscription } from "./types";

export const urlBase64ToUint8Array = (base64String: string) => {
  const base64 = base64String.trim();
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const base64WithPadding = base64 + padding;
  const urlSafeBase64 = base64WithPadding.replace(/-/g, "+").replace(/_/g, "/");

  try {
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

export const getBrowserInfo = () => {
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
