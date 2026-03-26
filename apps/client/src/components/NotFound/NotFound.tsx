import { memo, ReactNode } from "react";

import s from "./styles.module.scss";

type NotFoundProps = {
  filterValue: string;
  resultsFound?: number;
  nothingMsg?: ReactNode;
  notFoundMsg?: (filterValue: string) => ReactNode;
};

const NotFound = ({
  filterValue,
  resultsFound = null,
  nothingMsg,
  notFoundMsg,
}: NotFoundProps) => {
  if (resultsFound === null) return null;

  let content: ReactNode = null;

  if (notFoundMsg && !resultsFound) content = <p>{notFoundMsg(filterValue)}</p>;

  if (nothingMsg && !resultsFound && filterValue === "")
    content = <p>{nothingMsg}</p>;

  if (content === null) return null;

  return <div className={s.not_found}>{content}</div>;
};

export default memo(NotFound);
