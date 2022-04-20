import { useEffect, useRef, FC } from 'react';
import { useRouter } from 'next/router';
import {
  get_modules,
  get_cards,
  reset_fields_cards,
  reset_fields_modules,
  reset_search,
} from '../../store/actions/mainActions';
import { get_sr_count } from '../../store/actions/srActions';
import Skeleton from 'react-loading-skeleton';
import Navigation from './content/Navigation';
import ListContainer from './content/ListContainer';
import Search from './content/Search';
import Push from '../main/Push';
import ContentWrapper from '../main/ContentWrapper';
import { useAppDispatch, useAppSelector } from '../../store/store';

interface OwnProps {}

type Props = OwnProps;

const HomeContainer: FC<Props> = () => {
  const router = useRouter();
  const { section } = router.query;

  const dispatch = useAppDispatch();

  // const { user } = auth;
  const {
    main: { modules, cards, all_modules_number, all_cards_number },
    auth: { user },
  } = useAppSelector((state) => state);

  const { username } = user || {};

  useEffect(() => {
    if (!user) return;
    dispatch(reset_search());
    loadContent();
  }, [user, section]);

  useEffect(() => {
    if (section === 'modules') {
      window.addEventListener('scroll', scrollModules.current);
      window.removeEventListener('scroll', scrollCards.current);
    }

    if (section === 'cards') {
      window.addEventListener('scroll', scrollCards.current);
      window.removeEventListener('scroll', scrollModules.current);
    }

    if (section === 'sr') {
      window.removeEventListener('scroll', scrollCards.current);
      window.removeEventListener('scroll', scrollModules.current);
    }

    return () => {
      window.removeEventListener('scroll', scrollModules.current);
      window.removeEventListener('scroll', scrollCards.current);
    };
  }, [section]);

  useEffect(() => {
    return () => {
      dispatch(reset_fields_cards());
      dispatch(reset_fields_modules());
      dispatch(reset_search());
    };
  }, []);

  const loadContent = () => {
    if (!modules.length && section === 'modules') dispatch(get_modules(true));
    if (!cards.length && section === 'cards') dispatch(get_cards(true));
    if (section === 'sr') dispatch(get_sr_count());
  };

  const scrollModules = useRef(
    (e: Event) =>
      router.pathname === '/home/[section]' && check_bottom() && dispatch(get_modules())
  );
  const scrollCards = useRef(
    (e: Event) =>
      router.pathname === '/home/[section]' && check_bottom() && dispatch(get_cards())
  );

  const check_bottom = () => {
    const windowHeight = document.documentElement.clientHeight;

    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    const currentScroll = window.pageYOffset;

    const bottomOffset = scrollHeight - windowHeight - currentScroll;

    return bottomOffset <= 75;
  };

  return (
    <ContentWrapper>
      <div className='home'>
        <div className='container'>
          <div className='home__content'>
            <div className='home__content-header'>
              <div className='home__user-info'>
                <div className='home__nickname'>
                  <h1>{username ? username : <Skeleton width={250} />}</h1>
                </div>
                <Navigation />
                <div className='home__all-items-number'>
                  {section === 'cards' &&
                    `All cards: ${all_cards_number ? all_cards_number : '0'}`}
                  {section === 'modules' &&
                    `All modules: ${all_modules_number ? all_modules_number : '0'}`}
                </div>
              </div>
            </div>

            <div className='home__content-items-cont'>
              {(section === 'cards' || section === 'modules') && <Search />}
              <ListContainer />
            </div>
          </div>
        </div>
        <Push />
      </div>
    </ContentWrapper>
  );
};

export default HomeContainer;
