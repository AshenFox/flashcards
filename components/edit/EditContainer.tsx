import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import EditModule from './content/EditModule';
import CardsContainer from './content/CardsContainer';
import EditIntro from './content/EditIntro';
import { useAppSelector, useActions } from '../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const EditContainer: FC<Props> = () => {
  const { get_module, get_draft, clear_module } = useActions();

  const router = useRouter();
  const { _id } = router.query;

  const { user } = useAppSelector(({ auth }) => auth);

  useEffect(() => {
    if (user) {
      clear_module();
      if (_id === 'draft') get_draft();
      else if (typeof _id === 'string') get_module(_id);
    }
  }, [user, _id]);

  useEffect(() => {
    return () => {
      clear_module();
    };
  }, []);

  return (
    <>
      <EditIntro />
      <EditModule />
      <CardsContainer />
    </>
  );
};

export default EditContainer;
