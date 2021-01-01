import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change_modal, toggle_modal } from '../../store/actions/modalActions';

const StartContainer = ({ change_modal, toggle_modal }) => {
  const click = (value) => (e) => {
    change_modal(value);
    toggle_modal();
  };

  return (
    <div className='container'>
      <div className='start__content'>
        <div className='start__intro'>
          <div className='start__welcome'>
            <h1>Welcome to Flash Cards</h1>
          </div>
          <button
            onClick={click('log_in')}
            className='btn bcc-lightblue pad30-50 brr5 white fz175 h-grey h-bcc-yellow'
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

StartContainer.propTypes = {
  change_modal: PropTypes.func.isRequired,
  toggle_modal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(false, {
  change_modal,
  toggle_modal,
})(StartContainer);
