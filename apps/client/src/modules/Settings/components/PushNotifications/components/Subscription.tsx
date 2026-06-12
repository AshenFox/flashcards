import { DeleteIcon } from "@ui/Icons";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
import Tooltip from "@ui/Tooltip";
import { ChangeEvent, memo, useCallback } from "react";

import { usePushNotifications } from "../context";
import s from "../styles.module.scss";
import { Subscription as SubscriptionType } from "../types";

type SubscriptionProps = SubscriptionType;

const Subscription = ({ _id, name }: SubscriptionProps) => {
  const { handleRename, handleDelete, isLoading } = usePushNotifications();

  const onRename = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleRename(_id, { name: e.target.value });
    },
    [_id, handleRename],
  );

  const deleteBtnId = `subscription_delete_${_id}`;

  return (
    <div className={s.subscription}>
      <Input
        value={name}
        onChange={onRename}
        className={s.input}
        disabled={isLoading}
      />
      <Button
        id={deleteBtnId}
        className={s.delete}
        onClick={() => handleDelete(_id)}
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
