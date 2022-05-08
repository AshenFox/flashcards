import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import ContentContainer from './content/ContentContainer';
import Controls from './content/Controls';
import { useActions, useAppDispatch, useAppSelector } from '../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const WriteContainer: FC<Props> = () => {
  const {
    get_module_cards,
    clear_module,
    prepare_write,
    reset_all_game_fields,
    get_sr_cards,
  } = useActions();

  const {
    main: { cards },
    auth: { user },
  } = useAppSelector((state) => state);

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

  return (
    <>
      <Controls />
      <ContentContainer />
    </>
  );
};

export default WriteContainer;
