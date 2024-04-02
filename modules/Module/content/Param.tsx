import { FC } from 'react';
import { useAppSelector } from '../../../store/hooks';
import Search from '../../home/content/Search';

interface OwnProps {}

type Props = OwnProps;

const Param: FC<Props> = () => {
  const { module } = useAppSelector(({ main }) => main);

  const { number } = module || {};

  return (
    <div className='module__param'>
      <div className='module__count'>
        <span>{'Terms in this set ( '}</span>
        <span id='module__counter'>{number ? number : 0}</span>
        <span>{' )'}</span>
      </div>
      <Search />
    </div>
  );
};

export default Param;
