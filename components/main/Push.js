import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from '../../server/supplemental/axios';

const Push = ({ auth }) => {
  const { user } = auth;

  useEffect(() => {
    let device;
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

Push.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Push);

// ==========

let subscriptionSent = false;

const publicVapidKey =
  '***REMOVED***'; // ???

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

const preparePush = async (device) => {
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

const sendSubscription = async (device, subscription) => {
  try {
    const { data } = await axios.put('/api/notifications/subscribe', {
      device,
      subscription,
    });
  } catch (err) {
    console.log(err);
  }
};
