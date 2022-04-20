import { change_modal, toggle_modal } from '../../../store/actions/modalActions';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import ModuleQuestion from './ModuleQuestion';
import ModuleSRDropControl from './ModuleSRDropControl';
import ModuleSRControl from './ModuleSRControl';
import DateStr from '../../main/DateSrt';
import { FC, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';

interface OwnProps {}

type Props = OwnProps;

const Info: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const { module } = useAppSelector(({ main }) => main);

  const { author, _id, creation_date } = module || {};

  const openModal = (value: 'delete') => (e: MouseEvent<HTMLDivElement>) => {
    dispatch(change_modal(value));
    dispatch(toggle_modal());
  };

  return (
    <div className='module__info'>
      <div className='module__author'>
        <span className='module__author-created'>
          Created <DateStr date={creation_date} /> by
        </span>
        <span className='module__author-nickname'>
          {module ? author : <Skeleton width={100} />}
        </span>
      </div>

      <div className='module__nav'>
        <ModuleQuestion />
        <ModuleSRDropControl />
        <ModuleSRControl />
        <Link href={`/edit/${_id}`}>
          <div className='module__nav-item'>
            <svg width='25' height='25'>
              <use href='../img/sprite.svg#icon__edit'></use>
            </svg>
          </div>
        </Link>
        <div className='module__nav-item' onClick={openModal('delete')}>
          <svg width='25' height='25'>
            <use href='../img/sprite.svg#icon__delete'></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Info;
