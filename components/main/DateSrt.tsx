import { FC } from 'react';

interface OwnProps {
  date?: string;
}

type Props = OwnProps;

const DateStr: FC<Props> = ({ date }) => {
  if (!date) return <></>;

  const creationDate = new Date(date);

  let year = creationDate.getFullYear();
  let month = creationDate.getMonth() + 1 + '';
  month = `${month}`.length === 1 ? '0' + month : month;
  let day = creationDate.getDate() + '';
  day = `${day}`.length === 1 ? '0' + day : day;
  let hours = creationDate.getHours() + '';
  hours = `${hours}`.length === 1 ? '0' + hours : hours;
  let minutes = creationDate.getMinutes() + '';
  minutes = `${minutes}`.length === 1 ? '0' + minutes : minutes;

  return <>{`${day}-${month}-${year} ${hours}:${minutes}`}</>;
};

export default DateStr;
