import { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Item from './components/Item';
import s from './styles.module.scss';

const Navigation = () => {
  const router = useRouter();
  const { section } = router.query;

  const _default = section !== 'cards' && section !== 'modules' && section !== 'sr';

  useEffect(() => {
    if (_default && section !== undefined) router.replace('/home/modules');
  }, [section]);

  return (
    <div className={s.container}>
      <ul className={s.navigation}>
        <Item href='/home/cards' active={section === 'cards'}>
          Cards
        </Item>
        <Item href='/home/modules' active={section === 'modules'}>
          Modules
        </Item>
        <Item href='/home/sr' active={section === 'sr'}>
          SR
        </Item>
      </ul>
    </div>
  );
};

export default memo(Navigation);
