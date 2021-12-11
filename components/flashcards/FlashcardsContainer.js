import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get_module_cards, clear_module } from '../../store/actions/mainActions';
import { reset_all_game_fields } from '../../store/actions/gameActions';
import { get_sr_cards } from '../../store/actions/srActions';
import Controls from './content/Controls';
import ContentContainer from './content/ContentContainer';

const FlashcardsContainer = ({
  auth,
  get_module_cards,
  reset_all_game_fields,
  clear_module,
  get_sr_cards,
}) => {
  const router = useRouter();
  const { _id, number } = router.query;

  const isSR = _id === 'sr';

  const { user } = auth;

  useEffect(() => {
    if (user) {
      if (isSR) {
        get_sr_cards(number);
      } else {
        get_module_cards(_id);
      }
    }
  }, [user]);

  useEffect(() => {
    return () => {
      reset_all_game_fields();
      clear_module();
    };
  }, []);

  return (
    <>
      <Controls />
      <ContentContainer />
    </>
  );
};

FlashcardsContainer.propTypes = {
  main: PropTypes.object.isRequired,
  get_module_cards: PropTypes.func.isRequired,
  reset_all_game_fields: PropTypes.func.isRequired,
  clear_module: PropTypes.func.isRequired,
  get_sr_cards: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  main: state.main,
  dimen: state.dimen,
});

export default connect(mapStateToProps, {
  get_module_cards,
  reset_all_game_fields,
  clear_module,
  get_sr_cards,
})(FlashcardsContainer);
