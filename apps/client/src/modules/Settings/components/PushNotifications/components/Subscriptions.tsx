import { Button } from "@ui/InteractiveElement";
import Spinner from "@ui/Spinner";
import clsx from "clsx";
import { memo } from "react";

import { usePushNotifications } from "../context";
import s from "../styles.module.scss";
import Subscription from "./Subscription";

const Subscriptions = () => {
  const {
    subscriptions,
    currentSubscription,
    registration,
    permission,
    isLoading,
    pushPrepared,
    handleSubscribe,
  } = usePushNotifications();

  const otherSubscriptions = subscriptions.filter(
    sub => sub._id !== currentSubscription?.data._id,
  );

  return (
    <div className={s.subscriptions}>
      {isLoading && <Spinner variant="secondary" />}

      {pushPrepared && (
        <>
          <h3>Current Device</h3>
          {currentSubscription && (
            <Subscription {...currentSubscription.data} />
          )}
          {!currentSubscription &&
            registration?.active?.state === "activated" &&
            (permission?.state === "granted" ||
              permission?.state === "prompt") && (
              <div className={s.subscription}>
                <Button
                  onClick={handleSubscribe}
                  active={!isLoading}
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
              {otherSubscriptions.map(sub => (
                <Subscription key={sub._id} {...sub} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default memo(Subscriptions);
