import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get_module, get_draft, clear_module } from '../../store/actions/mainActions';
import EditModule from './content/EditModule';
import CardsContainer from './content/CardsContainer';
import EditIntro from './content/EditIntro';

const EditContainer = ({ auth, get_module, get_draft, clear_module }) => {
  const router = useRouter();
  const { _id } = router.query;

  const { user } = auth;

  useEffect(() => {
    if (user && _id === 'draft') clear_module();
    if (user) _id === 'draft' ? get_draft() : get_module(_id);
  }, [user, _id]);

  useEffect(() => {
    return () => {
      clear_module();
    };
  }, []);

  return (
    <>
      <EditIntro />
      <EditModule />
      <CardsContainer />
    </>
  );
};

EditContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  get_module: PropTypes.func.isRequired,
  get_draft: PropTypes.func.isRequired,
  clear_module: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  get_module,
  get_draft,
  clear_module,
})(EditContainer);
