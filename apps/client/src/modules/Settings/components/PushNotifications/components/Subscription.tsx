import { DeleteIcon } from "@ui/Icons";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
import { ChangeEvent, useCallback } from "react";

import { usePushNotifications } from "../context";
import s from "../styles.module.scss";
import { Subscription as SubscriptionType } from "../types";

type Props = {
  subscription: SubscriptionType;
};

const Subscription = ({ subscription }: Props) => {
  const { handleRename, handleDelete, isLoading } = usePushNotifications();

  const onRename = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      await handleRename(subscription._id, e.target.value);
    },
    [subscription._id, handleRename],
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

export default Subscription;
