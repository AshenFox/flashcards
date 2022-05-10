import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Controls from './content/Controls';
import ContentContainer from './content/ContentContainer';
import { useActions, useAppSelector } from '../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const FlashcardsContainer: FC<Props> = () => {
  const { get_module_cards, clear_module, reset_all_game_fields, get_sr_cards } =
    useActions();

  const router = useRouter();
  const { _id, number } = router.query;

  const isSR = _id === 'sr';

  const { user } = useAppSelector(({ auth }) => auth);

  useEffect(() => {
    if (user) {
      if (isSR && typeof number === 'string') get_sr_cards(+number);
      else if (typeof _id === 'string') get_module_cards(_id);
    }
  }, [user]);

  useEffect(() => {
    return () => {
      reset_all_game_fields();
      clear_module();
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
