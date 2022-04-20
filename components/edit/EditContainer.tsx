import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { get_module, get_draft, clear_module } from '../../store/actions/mainActions';
import EditModule from './content/EditModule';
import CardsContainer from './content/CardsContainer';
import EditIntro from './content/EditIntro';
import { useAppDispatch, useAppSelector } from '../../store/store';

interface OwnProps {}

type Props = OwnProps;

const EditContainer: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { _id } = router.query;

  const { user } = useAppSelector(({ auth }) => auth);

  useEffect(() => {
    if (user) {
      dispatch(clear_module());
      if (_id === 'draft') dispatch(get_draft());
      else if (typeof _id === 'string') dispatch(get_module(_id));
    }
  }, [user, _id]);

  useEffect(() => {
    return () => {
      dispatch(clear_module());
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
