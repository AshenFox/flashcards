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
  const { handleRename, handleDelete, setSubscriptions, isLoading } =
    usePushNotifications();

  const timer = useRef<NodeJS.Timeout | null>(null);

  const onRename = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setSubscriptions(prev => {
        const newSubscriptions = prev.map(sub => {
          if (sub._id === subscription._id)
            return { ...sub, name: e.target.value };
          return sub;
        });

        return newSubscriptions;
      });

      clearTimeout(timer.current);

      timer.current = setTimeout(async () => {
        await handleRename(subscription._id, e.target.value);
      }, 300);
    },
    [subscription._id, handleRename, setSubscriptions],
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
