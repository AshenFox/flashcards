import { MouseEvent, memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useActions, useAppSelector } from '@store/hooks';
import Controls, { ControlButtons } from '../components/Controls';
import ProgressWrite from './content/ProgressWrite';
import { WriteIcon } from '@ui/Icons';
import Content from './content/Content';

const Write = () => {
  const {
    get_module_cards,
    clear_module,
    prepare_write,
    reset_all_game_fields,
    get_sr_cards,
  } = useActions();

  const cards = useAppSelector(s => s.main.cards);
  const user = useAppSelector(s => s.auth.user);

  const router = useRouter();
  const { _id, number } = router.query;

  const isSR = _id === 'sr';

  const { length } = Object.values(cards);
  // const cardPrev = useRef(cards);

  useEffect(() => {
    return () => {
      reset_all_game_fields();
      clear_module();
    };
  }, []);

  useEffect(() => {
    if (user) {
      if (isSR && typeof number === 'string') get_sr_cards(+number);
      else if (typeof _id === 'string') get_module_cards(_id);
    }
  }, [user]);

  useEffect(() => {
    if (length) {
      prepare_write();
      // cardPrev.current = cards;
    }
  }, [length]);

  const clickStartOver = (e: MouseEvent<HTMLButtonElement>) => prepare_write();

  return (
    <>
      <Controls title='Write' titleIcon={<WriteIcon height='40' width='40' />}>
        <ProgressWrite />
        <ControlButtons>
          {!isSR && (
            <div className='game__startover'>
              <button
                //helpers-delete
                className='width100 fz15 pad7 br2 brc-grey-medium brr15 lightblue h-red h-brc-red'
                onClick={clickStartOver}
              >
                <span>Start over</span>
              </button>
            </div>
          )}
        </ControlButtons>
      </Controls>
      <Content />
    </>
  );
};

export default memo(Write);
