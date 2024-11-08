import { ErrorObj } from "@store/reducers/modal/modalInitState";
import { memo } from "react";

import s from "./styles.module.scss";

type ErrorProps = {
  errObj: ErrorObj;
  single?: boolean;
};

const Error = ({ errObj, single }: ErrorProps) => {
  const { ok, errors } = errObj;
  return (
    <div>
      {!ok && (
        <ul className={s.errors}>
          {single ? (
            <li>{errors[0]}</li>
          ) : (
            errors.map((error, i) => <li key={i}>{error}</li>)
          )}
        </ul>
      )}
    </div>
  );
};

export default memo(Error);
