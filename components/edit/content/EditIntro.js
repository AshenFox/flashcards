import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import ContentWrapper from '../../main/ContentWrapper';

const EditContainer = ({ main }) => {
  const router = useRouter();
  const { _id } = router.query;

  const {
    module: { draft },
  } = main;

  return (
    <div className='edit__intro'>
      <ContentWrapper tagType='section'>
        <div className='container'>
          <div className='edit__intro-content'>
            <div className='edit__intro-info'>
              <h2>Edit the study set! :)</h2>
            </div>
            <div className='edit__intro-return'>
              <Link href={draft ? '/home/modules' : `/module/${_id}`}>
                <button
                  className='btn bcc-lightblue pad12-30 brr15 white fz15 fw-normal h-grey h-bcc-yellow'
                  type='button'
                >
                  Return
                </button>
              </Link>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

EditContainer.propTypes = {
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, {})(EditContainer);
