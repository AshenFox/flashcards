import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import Study from './Study';
import Info from './Info';
import ContentWrapper from '../../main/ContentWrapper';

const ModuleContainer = ({ main }) => {
  const { module } = main;

  const {
    module: { title },
  } = main;

  return (
    <div className='module__header'>
      <ContentWrapper tagType='section'>
        <div className='container'>
          <div className='module__header-top'>
            <div className='module__title'>
              <h1 className={`${title ? '' : 'blue'}`}>
                {module ? title ? title : '(Untitled)' : <Skeleton width={150} />}
              </h1>
            </div>
            <div className='module__return'>
              <Link href={'/home/modules'}>
                <button className='btn bcc-lightblue pad12-30 brr15 white fz15 fw-normal h-grey h-bcc-yellow'>
                  Return
                </button>
              </Link>
            </div>
          </div>
          <Study />
          <Info />
        </div>
      </ContentWrapper>
    </div>
  );
};

ModuleContainer.propTypes = {
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, {})(ModuleContainer);
