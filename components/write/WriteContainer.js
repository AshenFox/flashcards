import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get_module_cards } from '../../store/actions/mainActions';
import Question from './content/Question';
import Answer from './content/Answer';
import Round from './content/Round';
import Finish from './content/Finish';
import Controls from './content/Controls';
import EditCard from '../edit/content/EditCard';

const WriteContainer = ({ main, dimen, auth, get_module_cards }) => {
  const { header_height, game_controls_height } = dimen;
  const { cards } = main;

  const router = useRouter();
  const { _id } = router.query;

  const { user } = auth;

  const cards_arr = Object.values(cards);

  useEffect(() => {
    if (user) {
      get_module_cards(_id);
    }
  }, [user]);

  useEffect(() => {
    writeStyles.current = {
      height: `${
        document.documentElement.clientHeight -
        header_height -
        (document.documentElement.clientWidth < 991 ? game_controls_height : 0)
      }px`,
    }; // subtract controls height
  });

  const writeStyles = useRef({}); // ????????? Do you need this?

  return (
    <>
      <Controls />

      <div
        className='game__content-container game__content-container--scrollable'
        style={writeStyles.current}
      >
        {/* COMPONENTS */}
        <div className='game__components game__components--scrollable'>
          {/* QUESTION */}
          <Question />
          <Answer />
          <Round />
          <Finish />

          {/* <div className='game__cards-container'>
            {cards_arr.length && (
              <EditCard data={cards_arr[0]} toggle={true} game={true} />
            )}
          </div> */}
        </div>
      </div>
    </>
  );
};

WriteContainer.propTypes = {
  dimen: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dimen: state.dimen,
  main: state.main,
  auth: state.auth,
  get_module_cards: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { get_module_cards })(WriteContainer);
