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
