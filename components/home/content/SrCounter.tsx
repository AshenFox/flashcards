import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_sr_counter } from '../../../store/actions/srActions';

const SrCounter = ({ sr, set_sr_counter }) => {
  const { counter } = sr;

  const handleCounterChange = (e) => set_sr_counter(false, e.target.value);

  const intervalRef = useRef(false);
  const timeoutRef = useRef(false);
  const blockSingle = useRef(false);

  const single = (value) => () => {
    if (blockSingle.current) return;
    if (value === 'stepUp') set_sr_counter(1);
    if (value === 'stepDown') set_sr_counter(-1);
  };

  const multiple = (value) => (e) => {
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = false;
      blockSingle.current = true;

      intervalRef.current = setInterval(() => {
        if (value === 'stepUp') set_sr_counter(5);
        if (value === 'stepDown') set_sr_counter(-5);
      }, 100);
    }, 500);
  };

  useEffect(() => {
    const cleanup = (e) => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
      timeoutRef.current = false;
      intervalRef.current = false;
      blockSingle.current = false;
    };

    window.addEventListener('mouseup', cleanup);
    window.addEventListener('touchend', cleanup);
    document.addEventListener('mouseleave', cleanup);

    return () => {
      window.removeEventListener('mouseup', cleanup);
      window.removeEventListener('touchend', cleanup);
      document.removeEventListener('mouseleave', cleanup);
    };
  }, []);

  return (
    <div className='home__counter-container'>
      <div className='home__counter'>
        <div
          className='home__counter-subtract'
          onMouseDown={multiple('stepDown')}
          onTouchStart={multiple('stepDown')}
          onMouseUp={single('stepDown')}
        />
        <input
          type='number'
          className='home__counter-number'
          onChange={handleCounterChange}
          value={counter}
        />
        <div
          className='home__counter-add'
          onMouseDown={multiple('stepUp')}
          onTouchStart={multiple('stepUp')}
          onMouseUp={single('stepUp')}
        />
      </div>
    </div>
  );
};

SrCounter.propTypes = {
  sr: PropTypes.object.isRequired,
  set_sr_counter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sr: state.sr,
});

export default connect(mapStateToProps, { set_sr_counter })(SrCounter);
