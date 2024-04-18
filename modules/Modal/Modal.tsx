import { useRef, MouseEvent, useEffect, memo } from 'react';
import ModalContent from './content/ModalContent';
import { useActions, useAppSelector } from '../../store/hooks';
import { CloseIcon } from '@ui/Icons';

const Modal = () => {
  const { toggle_modal } = useActions();

  const { is_modal, active_modal } = useAppSelector(({ modal }) => modal);

  const modalEl = useRef<HTMLDivElement>(null);
  const dialogEl = useRef<HTMLDivElement>(null);

  const transitionModal = 125;
  const transitionDialog = 225;

  useEffect(() => {
    let styleModal = modalEl.current.style;
    let styleDialog = dialogEl.current.style;

    if (is_modal) {
      styleModal.display = 'flex';

      setTimeout(() => {
        styleModal.opacity = '1';
      }, 0);

      setTimeout(() => {
        styleDialog.opacity = '1';
        styleDialog.transform = 'translateY(0vh)';
      }, transitionModal);
    } else {
      styleDialog.opacity = '';
      styleDialog.transform = '';

      setTimeout(() => {
        styleModal.opacity = '1';
      }, transitionDialog);

      setTimeout(() => {
        styleModal.display = '';
      }, transitionDialog + transitionModal);
    }
  }, [is_modal]);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === modalEl.current) toggle_modal();
  };

  const closeClick = (e: MouseEvent<HTMLDivElement>) => toggle_modal();

  return (
    <div
      className='modal'
      onMouseDown={onMouseDown}
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
          <div className='modal__close' onClick={closeClick}>
            <CloseIcon />
          </div>
        </div>

        <ModalContent />
      </div>
    </div>
  );
};

export default memo(Modal);
