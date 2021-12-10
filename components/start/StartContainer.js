import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change_modal, toggle_modal } from '../../store/actions/modalActions';

const StartContainer = ({ dimen, main, change_modal, toggle_modal }) => {
  const { header_height } = dimen;
  const { is_server } = main;

  const click = (value) => (e) => {
    change_modal(value);
    toggle_modal();
  };

  const startStyles = {
    minHeight: `${
      !is_server ? 0.1 + document.documentElement.clientHeight - header_height : 0
    }px`,
  };

  return (
    <main className='start'>
      <div className='start__content'>
        <div className='start__intro' style={startStyles}>
          <div className='start__welcome'>
            <h2>Welcome to</h2>
            <h1>Flash Cards</h1>
            <p>
              Web application for memorizing information via spaced repetition and
              interactive and engaging games.
            </p>
          </div>
          <button
            onClick={click('log_in')}
            className='btn bcc-lightblue pad15-60 brr15 white fz175 h-grey h-bcc-yellow'
          >
            Get started
          </button>
        </div>
      </div>
    </main>
  );
};

StartContainer.propTypes = {
  dimen: PropTypes.object.isRequired,
  change_modal: PropTypes.func.isRequired,
  toggle_modal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dimen: state.dimen,
  main: state.main,
});

export default connect(mapStateToProps, {
  change_modal,
  toggle_modal,
})(StartContainer);
