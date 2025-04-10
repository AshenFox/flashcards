import { DeleteIcon } from "@ui/Icons";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useRef,
} from "react";

import s from "../styles.module.scss";
import { Subscription as SubscriptionType } from "../types";

type Props = {
  subscription: SubscriptionType;
  isCurrentDevice?: boolean;
  onDelete: (id: string) => Promise<void>;
  onRename: (id: string, newName: string) => Promise<void>;
  setSubscriptions: Dispatch<SetStateAction<SubscriptionType[]>>;
  disabled?: boolean;
};

const Subscription = ({
  subscription,
  onDelete,
  onRename,
  setSubscriptions,
  disabled = false,
}: Props) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleRename = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSubscriptions(prev => {
        const newSubscriptions = prev.map(sub => {
          if (sub._id === subscription._id)
            return { ...sub, name: e.target.value };
          return sub;
        });

        return newSubscriptions;
      });

      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        onRename(subscription._id, e.target.value);
      }, 300);
    },
    [subscription._id, onRename, setSubscriptions],
  );

  return (
    <div className={s.subscription}>
      <Input
        value={subscription.name}
        onChange={handleRename}
        className={s.input}
        disabled={disabled}
      />
      <Button
        className={s.delete}
        onClick={() => onDelete(subscription._id)}
        design="plain"
        icon={<DeleteIcon />}
        active={!disabled}
      />
    </div>
  );
};

export default memo(Subscription);
