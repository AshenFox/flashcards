import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { get_module_cards, clear_module } from '../../store/actions/mainActions';
import { prepare_write, reset_all_game_fields } from '../../store/actions/gameActions';
import { get_sr_cards } from '../../store/actions/srActions';
import ContentContainer from './content/ContentContainer';
import Controls from './content/Controls';
import { useAppDispatch, useAppSelector } from '../../store/store';

interface OwnProps {}

type Props = OwnProps;

const WriteContainer: FC<Props> = () => {
  const dispatch = useAppDispatch();

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
      dispatch(reset_all_game_fields());
      dispatch(clear_module());
    };
  }, []);

  useEffect(() => {
    if (user) {
      if (isSR && typeof number === 'string') dispatch(get_sr_cards(+number));
      else if (typeof _id === 'string') dispatch(get_module_cards(_id));
    }
  }, [user]);

  useEffect(() => {
    if (length) {
      dispatch(prepare_write());
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
