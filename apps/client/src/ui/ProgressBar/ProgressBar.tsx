import clsx from "clsx";
import { CSSProperties, memo } from "react";

import s from "./styles.module.scss";

type ProgressBarProps = {
  progress: number;
  complete: number;
  title: string;
  className?: string;
  showComplete?: boolean;
  color?: "default" | "red" | "green";
};

const ProgressBar = ({
  progress,
  complete,
  title,
  showComplete = true,
  color = "default",
  className,
}: ProgressBarProps) => {
  const barFillStyle: CSSProperties = {
    width: `${(progress / complete) * 100}%`,
  };

  return (
    <div className={clsx(s.container, "progress-bar__container", className)}>
      <div className={clsx(s.bar, s[color], "progress-bar__bar")}>
        <div
          className={clsx(s.fill, s[color], "progress-bar__fill")}
          style={barFillStyle}
        ></div>
      </div>
      <div className={clsx(s.info, "progress-bar__info")}>
        {title && (
          <div className={clsx(s.title, "progress-bar__title")}>
            <span>{title}</span>
          </div>
        )}

        <div className={clsx(s.count, "progress-bar__count")}>
          <span>{progress}</span>
          {showComplete && <span>{`/${complete}`}</span>}
        </div>
      </div>
    </div>
  );
};

export default memo(ProgressBar);
