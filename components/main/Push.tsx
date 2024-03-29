import { FC } from 'react';
import { useEffect } from 'react';
import axios from '../../server/supplemental/axios';
import { useAppSelector } from '../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const Push: FC<Props> = () => {
  const { user } = useAppSelector(({ auth }) => auth);

  useEffect(() => {
    let device: 'mobile' | 'tablet' | 'pc';
    const screenWidth = screen.width;

    if (screenWidth < 620) {
      device = 'mobile';
    } else if (screenWidth < 991) {
      device = 'tablet';
    } else {
      device = 'pc';
    }

    if (user) {
      preparePush(device);
    }
  }, [user]);

  return <></>;
};

export default Push;

// ==========

let subscriptionSent: boolean = false;

const publicVapidKey: string =
  'BO-nIcm9sOZzf2YK6W7YkQsPrxjeFwdjoBfETtk7Fu1WOXNATlphUt1Khu5vwZs9WcI9EbgxwPMUuoFLLgmumMc'; // ???

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const preparePush = async (device: 'mobile' | 'tablet' | 'pc') => {
  if ('serviceWorker' in navigator) {
    if (subscriptionSent) return;

    // console.log('preparing push...');

    try {
      const register = await navigator.serviceWorker.register('/scripts/Worker.js');

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      await sendSubscription(device, subscription);

      subscriptionSent = true;
    } catch (err) {
      console.log(err);
    }
  }
};

const sendSubscription = async (
  device: 'mobile' | 'tablet' | 'pc',
  subscription: PushSubscription
) => {
  try {
    const { data }: { data: { msg: string } } = await axios.put(
      '/api/notifications/subscribe',
      {
        device,
        subscription,
      }
    );
  } catch (err) {
    console.log(err);
  }
};
