import { memo } from "react";

import s from "./style.module.scss";

type DividerProps = {
  prevDateString?: string;
  curDateString?: string;
  draft?: boolean;
};

const Divider = ({ prevDateString, curDateString, draft }: DividerProps) => {
  if (!curDateString) return null;

  const curBucket = getDateBucket(curDateString);
  const prevBucket = prevDateString ? getDateBucket(prevDateString) : undefined;

  if (prevBucket === curBucket) return null;

  const msg = draft ? "in progress" : curBucket;

  return (
    <div className={s.divider}>
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

const getDateBucket = (dateString: string): string => {
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

export const rowShowsDateDivider = (
  prevDateString?: string,
  curDateString?: string,
): boolean => {
  if (!curDateString) return false;
  if (!prevDateString) return true;
  return getDateBucket(prevDateString) !== getDateBucket(curDateString);
};
