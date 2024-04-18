import { useAppSelector } from '@store/store';
import { useRouter } from 'next/router';
import { memo } from 'react';
import s from './styles.module.scss';
import { getIsGame, getIsSR } from '@helpers/functions/determinePath';
import Title from './components/Title';
import Item from './components/Item';
import { GameBackIcon } from '@ui/Icons';

const Left = () => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = getIsSR(_id);
  const isGame = getIsGame(router.pathname);

  const user = useAppSelector(s => s.auth.user);
  const loading = useAppSelector(s => s.auth.loading);

  return (
    <div className={s.left}>
      {!loading && (
        <>
          {user && isGame && (
            <Item
              href={isSR ? '/home/sr' : `/module/${_id}`}
              icon={<GameBackIcon />}
              iconSize={25}
              className={s.back}
            />
          )}

          <Title />
        </>
      )}
    </div>
  );
};

export default memo(Left);
