import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { get_module_cards, clear_module } from '../../store/actions/mainActions';
import { reset_all_game_fields } from '../../store/actions/gameActions';
import { get_sr_cards } from '../../store/actions/srActions';
import Controls from './content/Controls';
import ContentContainer from './content/ContentContainer';
import { useAppDispatch, useAppSelector } from '../../store/store';

interface OwnProps {}

type Props = OwnProps;

const FlashcardsContainer: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { _id, number } = router.query;

  const isSR = _id === 'sr';

  const { user } = useAppSelector(({ auth }) => auth);

  useEffect(() => {
    if (user) {
      if (isSR && typeof number === 'string') dispatch(get_sr_cards(+number));
      else if (typeof _id === 'string') dispatch(get_module_cards(_id));
    }
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(reset_all_game_fields());
      dispatch(clear_module());
    };
  }, []);

  return (
    <>
      <Controls />
      <ContentContainer />
    </>
  );
};

export default FlashcardsContainer;
