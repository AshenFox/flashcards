import { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import { useActions, useAppSelector } from '@store/hooks';

const Module = () => {
  const { get_module, clear_module, reset_fields_cards, reset_search } = useActions();

  const router = useRouter();
  const { _id } = router.query;

  const user = useAppSelector(s => s.auth.user);

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
      <Header />
      <Body />
    </>
  );
};

export default memo(Module);
