import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get_module_cards } from '../../store/actions/mainActions';
import Controls from './content/Controls';
import CardsContainer from './content/CardsContainer';
import Navigation from './content/Navigation';

const FlashcardsContainer = ({ auth, dimen, get_module_cards }) => {
  const router = useRouter();
  const { _id } = router.query;

  const { user } = auth;
  const { header_height, game_controls_height } = dimen;

  useEffect(() => {
    if (user) {
      get_module_cards(_id);
    }
  }, [user]);

  useEffect(() => {
    flashcardsStyles.current = {
      height: `${
        document.documentElement.clientHeight -
        header_height -
        (document.documentElement.clientWidth < 991 ? game_controls_height : 0)
      }px`,
    };
  });

  const flashcardsStyles = useRef({}); // ????????? Do you need this?

  return (
    <>
      <Controls />

      <div
        className='game__content-container game__content-container--unscrollable'
        style={flashcardsStyles.current}
      >
        <div className='game__components game__components--unscrollable'>
          <CardsContainer />
          <Navigation />
        </div>
      </div>

      {/* <div
        className='game__content-container game__content-container--scrollable'
        style={flashcardsStyles.current}
      >
        <div className='game__components game__components--scrollable'>
          <CardsContainer />
        </div>
      </div> */}
    </>
  );
};

FlashcardsContainer.propTypes = {
  main: PropTypes.object.isRequired,
  get_module_cards: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  main: state.main,
  dimen: state.dimen,
});

export default connect(mapStateToProps, {
  get_module_cards,
})(FlashcardsContainer);

/* 

// CARD HTML

<div class="game__card-front ${defAnswer ? "rearside" : ""} ${
        active ? "" : "transparent next"
      }">
            <div class="game__img-container ${imgurl === "" ? "hidden" : ""} ${
        defenition === "" ? "full" : ""
      }">
                <div class="game__img" style="background-image: url(${
                  imgurl !== "" ? imgurl : ""
                });"></div>
            </div>

            <div class="game__defenition-container ${
              imgurl === "" ? "full" : ""
            } ${defenition === "" ? "hidden" : ""}">
                <div class="game__speaker-flashcards" data-active="${
                  voice.working &&
                  defenition !== "" &&
                  voice.detectLanguage(defenition)
                    ? "true"
                    : "false"
                }" data-speaking="false">
                  <svg height="22" width="22">
                    <use href="img/sprite.svg#icon__speaker"></use>
                  </svg>
                </div>
                <div class="game__defenition">
                    <p>${defenition}</p>
                </div>
            </div>
        </div>
        <div class="game__card-back ${defAnswer ? "" : "rearside"} ${
        active ? "" : "transparent next"
      }">
            <div class="game__term-container ${term === "" ? "hidden" : ""}">
                <div class="game__speaker-flashcards" data-active="${
                  voice.working && term !== "" && voice.detectLanguage(term)
                    ? "true"
                    : "false"
                }" data-speaking="false">
                  <svg height="22" width="22">
                    <use href="img/sprite.svg#icon__speaker"></use>
                  </svg>
                  
                </div>
                <div class="game__term">
                  <p>${term}</p>
                </div>
                
            </div>
        </div>

*/
