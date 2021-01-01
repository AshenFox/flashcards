import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  get_module,
  get_draft,
  clear_module,
} from '../../store/actions/mainActions';
import Link from 'next/link';
import EditModule from './content/EditModule';
import CardsContainer from './content/CardsContainer';

const EditContainer = ({ main, auth, get_module, get_draft, clear_module }) => {
  const router = useRouter();
  const { _id } = router.query;

  const { user } = auth;
  const {
    module: { draft },
  } = main;

  useEffect(() => {
    if (user) _id === 'draft' ? get_draft() : get_module(_id);
  }, [user, _id]);

  useEffect(() => {
    return () => {
      clear_module();
    };
  }, []);

  return (
    <div className='edit'>
      <div className='edit__intro'>
        <div className='container'>
          <div className='edit__intro-content'>
            <div className='edit__intro-info'>
              <h2>
                {/* ${
                          this.newModule
                            ? 'Create a new study set!'
                            : 'Edit the study set! :)'
                        } */}
                Edit the study set! :)
              </h2>
            </div>
            <div className='edit__intro-return'>
              <Link href={draft ? '/home/modules' : `/module/${_id}`}>
                <button
                  className='btn bcc-lightblue pad12-30 brr10 white fz15 fw-normal h-grey h-bcc-yellow'
                  type='button'
                >
                  {/* onclick="active.return();" */}
                  {/* ${this.newModule ? 'Cancel' : 'Return'} */}Return
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <EditModule />
      <CardsContainer />
    </div>
  );
};

EditContainer.propTypes = {
  main: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  get_module: PropTypes.func.isRequired,
  get_draft: PropTypes.func.isRequired,
  clear_module: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  main: state.main,
});

export default connect(mapStateToProps, {
  get_module,
  get_draft,
  clear_module,
})(EditContainer);
