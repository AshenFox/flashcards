import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  get_module,
  clear_module,
  reset_fields_cards,
  reset_search,
} from '../../store/actions/mainActions';
import ModuleHeader from './content/ModuleHeader';
import ModuleBody from './content/ModuleBody';

const ModuleContainer = ({
  auth,
  get_module,
  clear_module,
  reset_fields_cards,
  reset_search,
}) => {
  const router = useRouter();
  const { _id } = router.query;

  const { user } = auth;

  useEffect(() => {
    if (user) get_module(_id);
  }, [user]);

  useEffect(() => {
    return () => {
      clear_module();
      reset_fields_cards();
      reset_search();
    };
  }, []);

  return (
    <>
      <ModuleHeader />
      <ModuleBody />
    </>
  );
};

ModuleContainer.propTypes = {
  main: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  get_module: PropTypes.func.isRequired,
  clear_module: PropTypes.func.isRequired,
  reset_fields_cards: PropTypes.func.isRequired,
  reset_search: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  main: state.main,
});

export default connect(mapStateToProps, {
  get_module,
  clear_module,
  reset_fields_cards,
  reset_search,
})(ModuleContainer);
