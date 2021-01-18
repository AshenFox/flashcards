import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Push = (props) => {
  return <></>;
};

Push.propTypes = {};

export default Push;

// ==========

const publicVapidKey =
  'BO-nIcm9sOZzf2YK6W7YkQsPrxjeFwdjoBfETtk7Fu1WOXNATlphUt1Khu5vwZs9WcI9EbgxwPMUuoFLLgmumMc'; // ???

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const preparePush = async () => {
  if ('serviceWorker' in navigator) {
    if (subscriptionSent) return;

    console.log('preparing push...');

    try {
      register = await navigator.serviceWorker.register('../../supplemental/worker.js');

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      await sendSubscription(subscription);

      subscriptionSent = true;
    } catch (err) {
      console.log(err);
    }
  }
};

/* async function sendSubscription(subscription) {
  let reqData = {
    device,
    subscription,
  };
  let httpParam = new HttpParam('POST', reqData, true);
  let response = await fetch(url + '/notifications/subscribe', httpParam);

  if (response.ok) {
    let result = JSON.parse(await response.text());
    return result;
  }

  return false;
} */
