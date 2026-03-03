import { useSRStore } from "@zustand/sr";
import { MinusIcon, PlusIcon } from "@ui/Icons";
import Input from "@ui/Input";
import {
  ChangeEvent,
  memo,
  MouseEvent,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import s from "./styles.module.scss";

type CounterProps = {
  repeatNum?: number;
};

const Counter = ({ repeatNum }: CounterProps) => {
  const counter = useSRStore(s => s.counter);
  const updateCounter = useSRStore(s => s.updateCounter);

  const [localValue, setLocalValue] = useState<string>(() =>
    typeof counter === "number" ? String(counter) : "",
  );

  useEffect(() => {
    setLocalValue(typeof counter === "number" ? String(counter) : "");
  }, [counter]);

  const handleCounterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleCounterBlur = () => {
    if (!localValue) {
      // if input left empty, reset to minimum allowed value
      updateCounter({ value: "1", repeatNum });
      return;
    }

    updateCounter({ value: localValue, repeatNum });
  };

  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const blockSingle = useRef<boolean>(false);

  const single =
    (value: "stepUp" | "stepDown") => (e: MouseEvent<HTMLDivElement>) => {
      if (blockSingle.current) return;
      if (value === "stepUp") updateCounter({ additionNumber: 1, repeatNum });
      else if (value === "stepDown")
        updateCounter({ additionNumber: -1, repeatNum });
    };

  const multiple =
    (value: "stepUp" | "stepDown") =>
    (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        blockSingle.current = true;

        intervalRef.current = setInterval(() => {
          if (value === "stepUp")
            updateCounter({ additionNumber: 5, repeatNum });
          else if (value === "stepDown")
            updateCounter({ additionNumber: -5, repeatNum });
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
          onBlur={handleCounterBlur}
          value={localValue}
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
