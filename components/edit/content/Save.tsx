import { useRouter } from 'next/router';
import { FC, MouseEvent } from 'react';
import { create_module } from '../../../store/actions/editActions';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import LoadingButton from '../../main/LoadingButton';

interface OwnProps {}

type Props = OwnProps;

const Save: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const { module, cards } = useAppSelector(({ main }) => main);

  const { _id, draft, title, module_loading } = module || {};

  const router = useRouter();

  const clickSave = (e: MouseEvent<HTMLButtonElement>) => {
    if (active) dispatch(create_module());
  };

  const clickLink = (e: MouseEvent<HTMLButtonElement>) => {
    router.replace(`/module/${_id}`);
  };

  const cardsArr = Object.values(cards);

  let twoSaved = false;
  let counter = 0;

  for (const card of cardsArr) {
    if (card.save === true) {
      ++counter;
      if (counter >= 2) {
        twoSaved = true;
        break;
      }
    }
  }

  const active = !!(twoSaved && title);

  let btn = (
    <LoadingButton
      active={active || !draft ? true : false}
      loading={module_loading}
      onClickHandler={draft ? clickSave : clickLink}
      classStr='btn bcc-lightblue pad30-70 brr15 white fz20 fw-bold h-grey h-bcc-yellow'
    >
      {draft ? 'Save' : 'Return'}
    </LoadingButton>
  );

  return (
    <div className='edit__save'>
      <div className='container'>
        <div className='edit__save-module'>{btn}</div>
      </div>
    </div>
  );
};

export default Save;
