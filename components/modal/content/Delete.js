import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delete_module } from '../../../store/actions/editActions';
import { toggle_modal } from '../../../store/actions/modalActions';
import LoadingButton from '../../main/LoadingButton';

const Delete = ({ main, delete_module, toggle_modal }) => {
  const {
    module: { _id, module_loading, title },
  } = main;

  const clickDelete = () => delete_module(_id);

  const close = (e) => toggle_modal();

  return (
    <>
      <div className='modal__set-title'>
        <h2>{title}</h2>
      </div>

      <div className='modal__warning'>
        <p>
          You are about to delete this set and all of its data. You won't be able to
          access this set ever again.
        </p>
      </div>

      <div className='modal__question'>
        <p>Are you absolutely positive? There's no undo.</p>
      </div>

      <div className='modal__choice'>
        <div className='modal__choice-item'>
          <button
            className='btn width100 bcc-mudblue pad15-30 brr15 fz175 white h-opacity09'
            onClick={close}
          >
            Cancel
          </button>
        </div>

        <div className='modal__choice-item'>
          {/* <button
            className='btn width100 bcc-coral pad15-30 brr15 fz175 white h-opacity09'
            onClick={clickDelete}
          >
            Yes, delete set
          </button> */}
          <LoadingButton
            active={true}
            loading={module_loading}
            onClickHandler={clickDelete}
            classStr='btn width100 bcc-coral pad15-30 brr15 fz175 white h-opacity09'
          >
            Yes, delete set
          </LoadingButton>
        </div>
      </div>
    </>
  );
};

Delete.propTypes = {
  main: PropTypes.object.isRequired,
  delete_module: PropTypes.func.isRequired,
  toggle_modal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, {
  delete_module,
  toggle_modal,
})(Delete);
