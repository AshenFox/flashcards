import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  get_modules,
  get_cards,
  reset_fields_cards,
  reset_fields_modules,
  reset_search,
  set_main_loading,
} from '../../store/actions/mainActions';
import Skeleton from 'react-loading-skeleton';
import Navigation from './content/Navigation';
import ListContainer from './content/ListContainer';
import Search from './content/Search';

const HomeContainer = ({
  auth,
  main,
  get_modules,
  get_cards,
  reset_fields_cards,
  reset_fields_modules,
  reset_search,
  set_main_loading,
}) => {
  const router = useRouter();
  const { section } = router.query;

  const { user } = auth;
  const { username } = user ? user : {};
  const { modules, cards, all_modules_number, all_cards_number } = main;

  useEffect(() => {
    loadContent();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    reset_search();
    loadContent();
  }, [section]);

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
      set_main_loading(true);
      reset_fields_cards();
      reset_fields_modules();
      reset_search();
    };
  }, []);

  const loadContent = () => {
    if (!modules.length && section === 'modules') get_modules();
    if (!cards.length && section === 'cards') get_cards();
  };

  const scrollModules = useRef(
    (e) => router.pathname === '/home/[section]' && check_bottom() && get_modules()
  );
  const scrollCards = useRef(
    (e) => router.pathname === '/home/[section]' && check_bottom() && get_cards()
  );

  const check_bottom = (e) => {
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
    </div>
  );
};

HomeContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  main: PropTypes.object.isRequired,
  get_modules: PropTypes.func.isRequired,
  get_cards: PropTypes.func.isRequired,
  reset_fields_cards: PropTypes.func.isRequired,
  reset_fields_modules: PropTypes.func.isRequired,
  reset_search: PropTypes.func.isRequired,
  set_main_loading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  main: state.main,
});

export default connect(mapStateToProps, {
  get_modules,
  get_cards,
  reset_fields_cards,
  reset_fields_modules,
  reset_search,
  set_main_loading,
})(HomeContainer);
