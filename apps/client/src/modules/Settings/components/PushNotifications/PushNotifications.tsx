import { memo } from "react";

import Subscriptions from "./components/Subscriptions";
import { PushNotificationsProvider } from "./context";

const PushNotifications = () => {
  return (
    <PushNotificationsProvider>
      <Subscriptions />
    </PushNotificationsProvider>
  );
};

export default memo(PushNotifications);
