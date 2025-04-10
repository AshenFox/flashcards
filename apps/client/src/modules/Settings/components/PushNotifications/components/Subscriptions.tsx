import { Button } from "@ui/InteractiveElement";
import Spinner from "@ui/Spinner";
import clsx from "clsx";
import { Dispatch, memo, SetStateAction } from "react";

import s from "../styles.module.scss";
import {
  CurrentSubscription,
  Permission,
  Subscription as SubscriptionType,
} from "../types";
import Subscription from "./Subscription";

type Props = {
  subscriptions: SubscriptionType[];
  currentSubscription: CurrentSubscription;
  registration: ServiceWorkerRegistration | null;
  permission: Permission | null;
  onDelete: (id: string) => Promise<void>;
  onRename: (id: string, newName: string) => Promise<void>;
  onSubscribe: () => Promise<void>;
  setSubscriptions: Dispatch<SetStateAction<SubscriptionType[]>>;
  isLoading?: boolean;
};

const Subscriptions = ({
  subscriptions,
  currentSubscription,
  registration,
  permission,
  onDelete,
  onRename,
  onSubscribe,
  setSubscriptions,
  isLoading = false,
}: Props) => {
  const disabled = isLoading;
  const otherSubscriptions = subscriptions.filter(
    sub => sub._id !== currentSubscription?.data._id,
  );

  return (
    <div className={s.subscriptions}>
      {isLoading && <Spinner variant="secondary" />}

      <h3>Current Device</h3>
      {currentSubscription && (
        <Subscription
          subscription={currentSubscription.data}
          isCurrentDevice
          onDelete={onDelete}
          onRename={onRename}
          setSubscriptions={setSubscriptions}
          disabled={disabled}
        />
      )}
      {!currentSubscription &&
        registration?.active?.state === "activated" &&
        (permission?.state === "granted" || permission?.state === "prompt") && (
          <div className={s.subscription}>
            <Button
              onClick={onSubscribe}
              active={!disabled}
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
            <Subscription
              key={sub._id}
              subscription={sub}
              onDelete={onDelete}
              onRename={onRename}
              setSubscriptions={setSubscriptions}
              disabled={disabled}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default memo(Subscriptions);
