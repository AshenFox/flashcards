import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggle_modal } from '../../store/actions/modalActions';
import ModalContent from './content/ModalContent';

const Modal = ({ modal, toggle_modal }) => {
  const { is_modal, active_modal } = modal;

  const modalEl = useRef(null);
  const dialogEl = useRef(null);

  const transitionModal = 125;
  const transitionDialog = 225;

  useEffect(() => {
    let styleModal = modalEl.current.style;
    let styleDialog = dialogEl.current.style;
    if (is_modal) {
      styleModal.display = 'flex';

      setTimeout(() => {
        styleModal.opacity = 1;
      }, 0);

      setTimeout(() => {
        styleDialog.opacity = 1;
        styleDialog.transform = 'translateY(0vh)';
      }, transitionModal);
    } else {
      styleDialog.opacity = '';
      styleDialog.transform = '';

      setTimeout(() => {
        styleModal.opacity = 1;
      }, transitionDialog);

      setTimeout(() => {
        styleModal.display = '';
      }, transitionDialog + transitionModal);
    }
  }, [is_modal]);

  const close = (e) => {
    if (e.target === modalEl.current) toggle_modal();
  };

  return (
    <div
      className='modal'
      onClick={close}
      style={{ transitionDuration: transitionModal * 0.001 + 's' }}
      ref={modalEl}
    >
      <div
        className='modal__dialog'
        ref={dialogEl}
        style={{ transitionDuration: transitionDialog * 0.001 + 's' }}
      >
        <div className='modal__header'>
          <div className='modal__title'>
            <h3>
              {active_modal === 'log_in' ? 'Log in' : ''}
              {active_modal === 'sign_up' ? 'Sign up' : ''}
              {active_modal === 'delete' ? 'Delete this set?' : ''}
            </h3>
          </div>
          <div className='modal__close' onClick={toggle_modal}>
            <svg>
              <use href='../img/sprite.svg#icon__close'></use>
            </svg>
          </div>
        </div>

        <ModalContent />
      </div>
    </div>
  );
};

Modal.propTypes = {
  modal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
  toggle_modal: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, {
  toggle_modal,
})(Modal);
