import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  get_module,
  clear_module,
  reset_fields_cards,
  reset_search,
} from '../../store/actions/mainActions';
import ModuleHeader from './content/ModuleHeader';
import ModuleBody from './content/ModuleBody';
import { useAppDispatch, useAppSelector } from '../../store/store';

interface OwnProps {}

type Props = OwnProps;

const ModuleContainer: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { _id } = router.query;

  const { user } = useAppSelector(({ auth }) => auth);

  useEffect(() => {
    if (user && typeof _id === 'string') dispatch(get_module(_id));
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(clear_module());
      dispatch(reset_fields_cards());
      dispatch(reset_search());
    };
  }, []);

  return (
    <>
      <ModuleHeader />
      <ModuleBody />
    </>
  );
};

export default ModuleContainer;
