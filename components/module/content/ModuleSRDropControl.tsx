import { FC, MouseEvent } from 'react';
import { set_module_question } from '../../../store/actions/editActions';
import { useAppDispatch, useAppSelector } from '../../../store/store';

interface OwnProps {}

type Props = OwnProps;

const ModuleSRDropControl: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const { module } = useAppSelector(({ main }) => main);

  const { question } = module || {};

  const clickDropSR = (e: MouseEvent<HTMLDivElement>) =>
    dispatch(set_module_question(true));

  return (
    <div
      className='module__drop-studyregime'
      data-active={question}
      onClick={clickDropSR}
    >
      <span>Drop all cards study progress</span>
      <svg width='30' height='30'>
        <use href='../img/sprite.svg#icon__drop_studyregime'></use>
      </svg>
    </div>
  );
};

export default ModuleSRDropControl;
