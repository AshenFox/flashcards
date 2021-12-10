import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_scroll_width, set_is_scroll } from '../../store/actions/dimenActions';

const onSizeChange = () =>
  console.log(
    'onSizeChange fire!',
    window.innerWidth,
    document.documentElement.clientWidth
  );
const onSizeChangeDelayed = () => setTimeout(() => onSizeChange(), 200);

const ScrollSizeController = ({ dimen, set_scroll_width, set_is_scroll }) => {
  const router = useRouter();
  // const { section } = router.query;

  // state destructuring

  const [isHidden, setIsHidden] = useState(false);
  const scrollDiv = useRef(null);

  useEffect(() => {
    set_scroll_width(scrollDiv.current.offsetWidth - scrollDiv.current.clientWidth);

    setIsHidden(true);

    const resizeObserver = new ResizeObserver((entries) =>
      set_is_scroll(window.innerWidth - document.documentElement.clientWidth !== 0)
    );

    resizeObserver.observe(document.body);

    /* window.addEventListener('resize', onSizeChange);
    window.addEventListener('orientationchange', onSizeChangeDelayed); */

    return () => {
      /* window.removeEventListener('resize', onSizeChange);
      window.removeEventListener('orientationchange', onSizeChangeDelayed); */
      resizeObserver.disconnect();
    };
  }, []);

  /* useEffect(() => {
    if (section) console.log('Section have been changed!', section); // trigger scroll status change
  }, [section]); */

  return isHidden ? <></> : <div ref={scrollDiv} className='scroll-size' />;
};

ScrollSizeController.propTypes = {
  set_scroll_width: PropTypes.func.isRequired,
  set_is_scroll: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dimen: state.dimen,
});

export default connect(mapStateToProps, { set_scroll_width, set_is_scroll })(
  ScrollSizeController
);
