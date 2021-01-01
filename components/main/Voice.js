import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { init_voice } from '../../store/actions/voiceActions';

const Voice = ({ init_voice }) => {
  useEffect(() => {
    init_voice();
  }, []);

  return <></>;
};

Voice.propTypes = {
  init_voice: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(false, { init_voice })(Voice);
