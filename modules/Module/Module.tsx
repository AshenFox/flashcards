import { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import ModuleHeader from './content/ModuleHeader';
import ModuleBody from './content/ModuleBody';
import { useActions, useAppSelector } from '../../store/hooks';

const Module = () => {
  const { get_module, clear_module, reset_fields_cards, reset_search } = useActions();

  const router = useRouter();
  const { _id } = router.query;

  const { user } = useAppSelector(({ auth }) => auth);

  useEffect(() => {
    if (user && typeof _id === 'string') get_module(_id);
  }, [user]);

  useEffect(() => {
    return () => {
      clear_module();
      reset_fields_cards();
      reset_search();
    };
  }, []);

  return (
    <>
      <ModuleHeader />
      <ModuleBody />
    </>
  );
};

export default memo(Module);
