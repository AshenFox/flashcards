import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_scroll_top } from '../../store/actions/mainActions';

const ScrollTop = ({ main, set_scroll_top }) => {
  const { scroll_top } = main;

  const scroll_top_ref = useRef(scroll_top);
  scroll_top_ref.current = scroll_top;

  useEffect(() => {
    const onScroll = (e) => {
      if (window.pageYOffset > 100 && !scroll_top_ref.current)
        set_scroll_top(true);

      if (window.pageYOffset < 100 && scroll_top_ref.current)
        set_scroll_top(false);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const clickScroll = () => movePageUp();

  return (
    <div
      className={`scroll ${scroll_top ? 'active' : ''}`}
      onClick={clickScroll}
    >
      <svg height='20' width='20'>
        <use href='../img/sprite.svg#icon__arrow_up'></use>
      </svg>
    </div>
  );
};

ScrollTop.propTypes = {
  main: PropTypes.object.isRequired,
  set_scroll_top: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, { set_scroll_top })(ScrollTop);

let startTime = null;

const ease = (currentTime, startValue, changeInValue, duration) => {
  currentTime /= duration / 2;

  if (currentTime < 1)
    return (changeInValue / 2) * currentTime * currentTime + startValue;
  currentTime--;
  return (
    (-changeInValue / 2) * (currentTime * (currentTime - 2) - 1) + startValue
  );
};

const animation = (currentTime) => {
  if (startTime === null) startTime = currentTime;

  let timeElapsed = currentTime - startTime;
  let positionY = ease(timeElapsed, pageYOffset, -pageYOffset, 750);

  window.scrollTo(0, positionY);
  if (positionY) {
    requestAnimationFrame(animation);
  } else {
    startTime = null;
  }
};

const movePageUp = () => {
  let pageYOffset = window.pageYOffset || document.documentElement.scrollTop;

  if (pageYOffset) {
    requestAnimationFrame(animation);
  }
};
