import { useRouter } from 'next/router';
import { FC, MouseEvent } from 'react';
import { useActions, useAppSelector } from '../../../store/hooks';
import LoadingBtn from '@ui/LoadingBtn';
import Container from '@components/Container';

interface OwnProps {}

type Props = OwnProps;

const Save: FC<Props> = () => {
  const { create_module } = useActions();

  const { module, cards } = useAppSelector(({ main }) => main);

  const { _id, draft, title, module_loading } = module || {};

  const router = useRouter();

  const clickSave = (e: MouseEvent<HTMLButtonElement>) => {
    if (active) create_module();
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

  return (
    <div className='edit__save'>
      <Container>
        <div className='edit__save-module'>
          <LoadingBtn
            active={active || !draft ? true : false}
            loading={module_loading}
            onClickHandler={draft ? clickSave : clickLink}
            classStr='btn bcc-lightblue pad30-70 brr15 white fz20 fw-bold h-grey h-bcc-yellow'
          >
            {draft ? 'Save' : 'Return'}
          </LoadingBtn>
        </div>
      </Container>
    </div>
  );
};

export default Save;
