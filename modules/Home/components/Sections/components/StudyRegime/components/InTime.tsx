import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useAppSelector } from '@store/hooks';

const InTime = () => {
  const {
    sr: { next_num, next_date },
    main: { loading },
  } = useAppSelector(state => state);

  return (
    <>
      {!!next_num && next_date && (
        <>
          <span>
            {loading ? <Skeleton width={25} /> : next_num} card
            {next_num > 1 || next_num < 1 ? 's' : ''}
          </span>{' '}
          to repeat {getTimeIntervalStr(next_date)}.
        </>
      )}
    </>
  );
};

export default memo(InTime);

const getTimeIntervalStr = (dateStr: string) => {
  const mil = new Date(dateStr).getTime();

  let sec = (mil - Date.now()) * 0.001;

  if (sec < 60) {
    return 'in a minute';
  } else if (sec < 3600) {
    let int = Math.floor(sec / 60);
    return `in ${int} minute${int === 1 ? '' : 's'}`;
  } else if (sec < 7200) {
    return `in an hour`;
  } else if (sec < 86400) {
    let int = Math.floor(sec / 3600);
    return `in ${int} hour${int === 1 ? '' : 's'}`;
  } else if (sec < 172800) {
    return `tomorrow`;
  } else if (sec < 604800) {
    let int = Math.floor(sec / 86400);
    return `in ${int} day${int === 1 ? '' : 's'}`;
  } else if (sec < 1209600) {
    return `in a week`;
  } else if (sec < 2419200) {
    let int = Math.floor(sec / 604800);
    return `in ${int} week${int === 1 ? '' : 's'}`;
  } else if (sec < 4838400) {
    return `in a month`;
  } else {
    let int = Math.floor(sec / 2419200);
    return `in ${int} month${int === 1 ? '' : 's'}`;
  }
};
