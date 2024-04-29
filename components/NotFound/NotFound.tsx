import { ReactNode, memo } from 'react';
import s from './styles.module.scss';

type NotFoundProps = {
  resultsFound: number;
  filterValue: string;
  nothingMsg?: ReactNode;
  notFoundMsg?: (filterValue: string) => ReactNode;
};

const NotFound = ({
  resultsFound,
  filterValue,
  nothingMsg,
  notFoundMsg,
}: NotFoundProps) => {
  let content: ReactNode;

  if (notFoundMsg && !resultsFound) content = <p>{notFoundMsg(filterValue)}</p>;

  if (nothingMsg && !resultsFound && filterValue === '') content = <p>{nothingMsg}</p>;

  return <div className={s.not_found}>{content}</div>;
};

export default memo(NotFound);
