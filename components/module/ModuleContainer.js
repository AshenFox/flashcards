import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  get_module,
  clear_module,
  reset_fields_cards,
  reset_search,
} from '../../store/actions/mainActions';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import Study from './content/Study';
import Info from './content/Info';
import Param from './content/Param';
import CardsContainer from './content/CardsContainer';

const ModuleContainer = ({
  main,
  auth,
  get_module,
  clear_module,
  reset_fields_cards,
  reset_search,
}) => {
  const router = useRouter();
  const { _id } = router.query;

  const { user } = auth;
  const { module } = main;
  const {
    module: { title },
  } = main;

  useEffect(() => {
    if (user) get_module(_id);
  }, [user]);

  useEffect(() => {
    return () => {
      clear_module();
      reset_fields_cards();
      reset_search();
    };
  }, []);

  return (
    <div className='module'>
      <div className='module__header'>
        <div className='container'>
          <div className='module__header-top'>
            <div className='module__title'>
              <h1 className={`${title ? '' : 'blue'}`}>
                {module ? (
                  title ? (
                    title
                  ) : (
                    '(Untitled)'
                  )
                ) : (
                  <Skeleton width={150} />
                )}
              </h1>
            </div>
            <Link href='/home/modules'>
              <div className='module__return'>
                <button className='btn bcc-lightblue pad12-30 brr15 white fz15 fw-normal h-grey h-bcc-yellow'>
                  Return
                </button>
              </div>
            </Link>
          </div>
          <Study />
          <Info />
        </div>
      </div>

      <div className='module__body'>
        <div className='container'>
          <Param />
          <CardsContainer />
        </div>
      </div>
    </div>
  );
};

ModuleContainer.propTypes = {
  main: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  get_module: PropTypes.func.isRequired,
  clear_module: PropTypes.func.isRequired,
  reset_fields_cards: PropTypes.func.isRequired,
  reset_search: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  main: state.main,
});

export default connect(mapStateToProps, {
  get_module,
  clear_module,
  reset_fields_cards,
  reset_search,
})(ModuleContainer);
