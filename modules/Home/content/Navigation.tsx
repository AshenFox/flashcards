import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface OwnProps {}

type Props = OwnProps;

const Navigation: FC<Props> = () => {
  const router = useRouter();

  const { section } = router.query;

  const _default = section !== 'cards' && section !== 'modules' && section !== 'sr';

  useEffect(() => {
    if (_default && section !== undefined) router.replace('/home/modules');
  }, [section]);

  return (
    <div className='home__navigation-container'>
      <ul className='home__navigation'>
        <Link href='/home/cards'>
          <li
            className={`home__navigation-item home__navigation-item--1 ${
              section === 'cards' ? 'active' : ''
            }`}
          >
            Cards
          </li>
        </Link>
        <Link href='/home/modules'>
          <li
            className={`home__navigation-item home__navigation-item--2 ${
              section === 'modules' || _default ? 'active' : ''
            }`}
          >
            Modules
          </li>
        </Link>
        <Link href='/home/sr'>
          <li
            className={`home__navigation-item home__navigation-item--3 ${
              section === 'sr' ? 'active' : ''
            }`}
          >
            SR
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navigation;
