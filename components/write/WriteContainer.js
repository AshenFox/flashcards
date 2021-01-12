import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  get_module_cards,
  clear_module,
} from '../../store/actions/mainActions';
import {
  prepare_write,
  reset_all_game_fields,
} from '../../store/actions/gameActions';
import ContentContainer from './content/ContentContainer';
import Controls from './content/Controls';

const WriteContainer = ({
  main,
  auth,
  game,
  get_module_cards,
  prepare_write,
  reset_all_game_fields,
  clear_module,
}) => {
  const { cards } = main;
  /* const {
    write: { is_init },
  } = game; */

  const router = useRouter();
  const { _id } = router.query;
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
      get_module_cards(_id);
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
  game: PropTypes.object.isRequired,
  get_module_cards: PropTypes.func.isRequired,
  clear_module: PropTypes.func.isRequired,
  prepare_write: PropTypes.func.isRequired,
  reset_all_game_fields: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
  auth: state.auth,
  game: state.game,
});

export default connect(mapStateToProps, {
  get_module_cards,
  prepare_write,
  reset_all_game_fields,
  clear_module,
})(WriteContainer);
