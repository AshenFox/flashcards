import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_main_loading } from '../../store/actions/mainActions';
import Router from 'next/router';

const RouterConfiguration = ({ set_main_loading }) => {
  const baseRef = useRef(false);

  useEffect(() => {
    Router.events.on('routeChangeComplete', (url) => {
      const base = url.match(/\/.[^\/]*/)[0];

      // console.log(`Loading: ${url}`, base, baseRef.current);

      if (base !== baseRef.current) set_main_loading(true);
      baseRef.current = base;
    });
  }, []);

  return <></>;
};

RouterConfiguration.propTypes = {
  set_main_loading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  set_main_loading,
})(RouterConfiguration);
