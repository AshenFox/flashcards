import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

const SrCounter = ({ main, sr }) => {
  const { loading } = main;
  const { counter } = sr;

  return (
    <div className='home__counter-container'>
      <div className='home__counter'>
        <div className='home__counter-subtract'>
          <span>-</span>
        </div>
        <div className='home__counter-number'>
          {loading ? <Skeleton width={35} /> : counter}
        </div>
        <div className='home__counter-add'>
          <span>+</span>
        </div>
      </div>
    </div>
  );
};

SrCounter.propTypes = {
  sr: PropTypes.object.isRequired,
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  sr: state.sr,
  main: state.main,
});

export default connect(mapStateToProps)(SrCounter);
