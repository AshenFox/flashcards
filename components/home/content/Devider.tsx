import { FC } from 'react';
import { Module } from '../../../store/reducers/main/mainInitState';

interface OwnProps {
  name?: string;
  draft?: Module | false;
}

type Props = OwnProps;

const Devider: FC<Props> = ({ name, draft }) => {
  const msg = draft ? 'in progress' : name;

  return (
    <div className='home__divider'>
      <div className='home__divider-text'>{msg.toUpperCase()}</div>
      <div className='home__divider-line'></div>
    </div>
  );
};

export default Devider;

export const create_name = (str_date: string) => {
  const date = new Date(str_date);

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
