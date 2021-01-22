import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get_module_cards, clear_module } from '../../store/actions/mainActions';
import { prepare_write, reset_all_game_fields } from '../../store/actions/gameActions';
import { get_sr_cards } from '../../store/actions/srActions';
import ContentContainer from './content/ContentContainer';
import Controls from './content/Controls';

const WriteContainer = ({
  main,
  auth,
  get_module_cards,
  prepare_write,
  reset_all_game_fields,
  clear_module,
  get_sr_cards,
}) => {
  const { cards } = main;

  const router = useRouter();
  const { _id, number } = router.query;

  const isSR = _id === 'sr';

  const { user } = auth;

  const { length } = Object.values(cards);
  const cardPrev = useRef(cards);

  useEffect(() => {
    return () => {
      reset_all_game_fields();
      clear_module();
    };
  }, []);

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
    if (length) {
      prepare_write();
      cardPrev.current = cards;
    }
  }, [length]);

  return (
    <>
      <Controls />
      <ContentContainer />
    </>
  );
};

WriteContainer.propTypes = {
  main: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  get_module_cards: PropTypes.func.isRequired,
  clear_module: PropTypes.func.isRequired,
  prepare_write: PropTypes.func.isRequired,
  reset_all_game_fields: PropTypes.func.isRequired,
  get_sr_cards: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  get_module_cards,
  prepare_write,
  reset_all_game_fields,
  clear_module,
  get_sr_cards,
})(WriteContainer);
