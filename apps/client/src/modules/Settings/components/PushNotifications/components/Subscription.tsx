import { DeleteIcon } from "@ui/Icons";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
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

  return (
    <div className={s.subscription}>
      <Input
        value={subscription.name}
        onChange={onRename}
        className={s.input}
        disabled={isLoading}
      />
      <Button
        className={s.delete}
        onClick={() => handleDelete(subscription._id)}
        design="plain"
        icon={<DeleteIcon />}
        active={!isLoading}
      />
    </div>
  );
};

export default memo(Subscription);
