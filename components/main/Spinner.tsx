import { FC } from 'react';
import { useAppSelector } from '../../store/store';

interface OwnProps {}

type Props = OwnProps;

const Spinner: FC<Props> = () => {
  const { loading } = useAppSelector(({ auth }) => auth);

  return (
    <div className={`spinner__container ${!loading ? 'hidden' : ''}`}>
      <div className='spinner'></div>
    </div>
  );
};

export default Spinner;
