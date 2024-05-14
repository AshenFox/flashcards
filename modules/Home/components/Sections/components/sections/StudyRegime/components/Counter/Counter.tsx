import { useActions, useAppSelector } from "@store/hooks";
import { MinusIcon, PlusIcon } from "@ui/Icons";
import Input from "@ui/Input";
import {
  ChangeEvent,
  memo,
  MouseEvent,
  TouchEvent,
  useEffect,
  useRef,
} from "react";

import s from "./styles.module.scss";

const Counter = () => {
  const { set_sr_counter } = useActions();

  const counter = useAppSelector(s => s.sr.counter);

  const handleCounterChange = (e: ChangeEvent<HTMLInputElement>) =>
    set_sr_counter(null, e.target.value);

  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const blockSingle = useRef<boolean>(false);

  const single =
    (value: "stepUp" | "stepDown") => (e: MouseEvent<HTMLDivElement>) => {
      if (blockSingle.current) return;
      if (value === "stepUp") set_sr_counter(1);
      if (value === "stepDown") set_sr_counter(-1);
    };

  const multiple =
    (value: "stepUp" | "stepDown") =>
    (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        blockSingle.current = true;

        intervalRef.current = setInterval(() => {
          if (value === "stepUp") set_sr_counter(5);
          if (value === "stepDown") set_sr_counter(-5);
        }, 100);
      }, 500);
    };

  useEffect(() => {
    const cleanup = (e: Event) => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
      timeoutRef.current = null;
      intervalRef.current = null;
      blockSingle.current = false;
    };

    window.addEventListener("mouseup", cleanup);
    window.addEventListener("touchend", cleanup);
    document.addEventListener("mouseleave", cleanup);

    return () => {
      window.removeEventListener("mouseup", cleanup);
      window.removeEventListener("touchend", cleanup);
      document.removeEventListener("mouseleave", cleanup);
    };
  }, []);

  return (
    <div className={s.container}>
      <div className={s.counter}>
        <div
          className={s.subtract}
          onMouseDown={multiple("stepDown")}
          onTouchStart={multiple("stepDown")}
          onMouseUp={single("stepDown")}
        >
          <MinusIcon />
        </div>
        <Input
          type="number"
          className={s.number}
          onChange={handleCounterChange}
          value={counter}
        />
        <div
          className={s.add}
          onMouseDown={multiple("stepUp")}
          onTouchStart={multiple("stepUp")}
          onMouseUp={single("stepUp")}
        >
          <PlusIcon />
        </div>
      </div>
    </div>
  );
};

export default memo(Counter);
