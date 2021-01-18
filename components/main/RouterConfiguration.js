import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_main_loading } from '../../store/actions/mainActions';
import Router from 'next/router';

const RouterConfiguration = ({ set_main_loading }) => {
  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      //   console.log(`Loading: ${url}`);
      set_main_loading(true);
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
