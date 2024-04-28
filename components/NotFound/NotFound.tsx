import { ReactNode, memo } from 'react';
import s from './styles.module.scss';

type NotFoundProps = {
  resultsFound: number;
  filterValue: string;
  notFoundMsg: (filterValue: string) => ReactNode;
  nothingMsg: ReactNode;
};

const NotFound = ({
  resultsFound,
  filterValue,
  notFoundMsg,
  nothingMsg,
}: NotFoundProps) => {
  let content: ReactNode;

  if (!resultsFound) content = <p>{notFoundMsg(filterValue)}</p>;

  if (!resultsFound && filterValue === '') content = <p>{nothingMsg}</p>;

  return <div className={s.not_found}>{content}</div>;
};

export default memo(NotFound);
