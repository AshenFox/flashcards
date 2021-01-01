import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delete_module } from '../../../store/actions/editActions';

const Delete = ({ modal, main, delete_module }) => {
  const { module } = main;

  const clickDelete = () => delete_module(module._id);
  return (
    <>
      <div className='modal__set-title'>
        <h2>A few words per day 24</h2>
      </div>

      <div className='modal__warning'>
        <p>
          You are about to delete this set and all of its data. You won't be
          able to access this set ever again.
        </p>
      </div>

      <div className='modal__question'>
        <p>Are you absolutely positive? There's no undo.</p>
      </div>

      <div className='modal__choice'>
        <div className='modal__choice-item'>
          <button className='btn width100 bcc-mudblue pad15-30 brr5 fz175 white h-opacity09'>
            Cancel
          </button>
        </div>

        <div className='modal__choice-item'>
          <button
            className='btn width100 bcc-coral pad15-30 brr5 fz175 white h-opacity09'
            onClick={clickDelete}
          >
            Yes, delete set
          </button>
        </div>
      </div>
    </>
  );
};

Delete.propTypes = {
  modal: PropTypes.object.isRequired,
  main: PropTypes.object.isRequired,
  delete_module: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
  main: state.main,
});

export default connect(mapStateToProps, { delete_module })(Delete);
