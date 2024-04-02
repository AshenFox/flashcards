import { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Module from './components/Module';
import CardsContainer from './components/Cards/Cards';
import Intro from './components/Intro';
import { useAppSelector, useActions } from '../../store/hooks';

const Edit = () => {
  const { get_module, get_draft, clear_module } = useActions();

  const router = useRouter();
  const { _id } = router.query;

  const user = useAppSelector(s => s.auth.user);

  useEffect(() => {
    if (user) {
      clear_module();
      if (_id === 'draft') get_draft();
      else if (typeof _id === 'string') get_module(_id);
    }
  }, [user, _id, clear_module, get_draft, get_module]);

  useEffect(() => {
    return () => {
      clear_module();
    };
  }, [clear_module]);

  return (
    <>
      <Intro />
      <Module />
      <CardsContainer />
    </>
  );
};

export default memo(Edit);
