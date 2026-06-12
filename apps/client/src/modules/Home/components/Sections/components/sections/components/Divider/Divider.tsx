import clsx from "clsx";
import { memo } from "react";

import s from "./style.module.scss";

type DividerProps = {
  label?: string;
  draft?: boolean;
};

const Divider = ({ label, draft }: DividerProps) => {
  if (!draft && !label) return null;

  const msg = draft ? "in progress" : (label as string);

  return (
    <div className={clsx(s.divider)}>
      <div className={s.text}>{msg.toUpperCase()}</div>
      <div className={s.line}></div>
    </div>
  );
};

export default memo(Divider);

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const getDateBucket = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - startOfToday.getDay());

  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

  if (date >= startOfToday) return "today";
  if (date >= startOfYesterday) return "yesterday";
  if (date >= startOfWeek) return "this week";
  if (date >= startOfLastWeek) return "last week";

  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const getBelowDividerLabel = (
  curDateString: string | undefined,
  nextDateString: string | undefined,
): string | undefined => {
  if (!curDateString || !nextDateString) return undefined;
  const curBucket = getDateBucket(curDateString);
  const nextBucket = getDateBucket(nextDateString);
  if (curBucket === nextBucket) return undefined;
  return nextBucket;
};

export const getTopDividerLabel = (
  curDateString: string | undefined,
): string | undefined => {
  if (!curDateString) return undefined;
  return getDateBucket(curDateString);
};
