import { memo } from 'react';
import s from './style.module.scss';

type DividerProps = {
  prevDateString?: string;
  curDateString?: string;
  draft?: boolean;
};

const Divider = ({ prevDateString, curDateString, draft }: DividerProps) => {
  const { curName, exists } = process(prevDateString, curDateString);

  if (exists) return;

  const msg = draft ? 'in progress' : curName;

  return (
    <div className={s.divider}>
      <div className={s.text}>{msg.toUpperCase()}</div>
      <div className={s.line}></div>
    </div>
  );
};

export default memo(Divider);

const createName = (dateString: string) => {
  const date = new Date(dateString);

  const sec = (new Date().getTime() - date.getTime()) * 0.001;

  if (sec < 60) {
    return 'a few seconds ago';
  } else if (sec < 600) {
    return 'several minutes ago';
  } else if (sec < 1800) {
    return `${Math.floor(sec / 60)} minutes ago`;
  } else if (sec < 3600) {
    return `less than an hour ago`;
  } else if (sec < 86400) {
    return `${Math.floor(sec / 3600)} hours ago`;
  } else if (sec < 604800) {
    return `several days ago`;
  } else if (sec < 2419200) {
    return `${Math.floor(sec / 604800)} weeks ago`;
  } else {
    return `in ${months[date.getMonth()]} ${date.getFullYear()}`;
  }
};

const process = (prevDateString?: string, curDateString?: string) => {
  const prevName = prevDateString && createName(prevDateString);
  const curName = curDateString && createName(curDateString);

  const exists =
    typeof prevName === 'string' && typeof curName === 'string' && curName === prevName;

  return { curName, exists };
};

const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];
