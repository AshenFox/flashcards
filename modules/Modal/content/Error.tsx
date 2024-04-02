import { FC } from 'react';
import { ErrorObj } from '../../../store/reducers/modal/modalInitState';

interface OwnProps {
  errObj: ErrorObj;
  single?: boolean;
}

type Props = OwnProps;

const Error: FC<Props> = ({ errObj, single }) => {
  const { ok, errors } = errObj;
  return (
    <div className='modal__username-error'>
      {!ok && (
        <ul className='modal__error-list'>
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

export default Error;
