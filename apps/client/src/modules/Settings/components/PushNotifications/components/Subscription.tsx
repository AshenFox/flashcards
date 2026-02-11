import { DeleteIcon } from "@ui/Icons";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
import Tooltip from "@ui/Tooltip";
import { ChangeEvent, memo, useCallback, useRef } from "react";

import { usePushNotifications } from "../context";
import s from "../styles.module.scss";
import { Subscription as SubscriptionType } from "../types";

type Props = {
  subscription: SubscriptionType;
};

const Subscription = ({ subscription }: Props) => {
  const { handleRename, handleDelete, setSubscriptionName, isLoading } =
    usePushNotifications();

  const timer = useRef<NodeJS.Timeout | null>(null);

  const onRename = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSubscriptionName(value, subscription._id);
      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        handleRename(subscription._id, value);
      }, 300);
    },
    [subscription._id, handleRename, setSubscriptionName],
  );

  const deleteBtnId = `subscription_delete_${subscription._id}`;

  return (
    <div className={s.subscription}>
      <Input
        value={subscription.name}
        onChange={onRename}
        className={s.input}
        disabled={isLoading}
      />
      <Button
        id={deleteBtnId}
        className={s.delete}
        onClick={() => handleDelete(subscription._id)}
        design="plain"
        icon={<DeleteIcon />}
        active={!isLoading}
      />
      <Tooltip id={deleteBtnId} offset={5}>
        Delete subscription
      </Tooltip>
    </div>
  );
};

export default memo(Subscription);
