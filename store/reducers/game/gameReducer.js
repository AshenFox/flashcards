import {
  SET_FLASHCARDS_PROGRESS,
  RESET_FLASHCARDS_PROGRESS,
  SET_FLASHCARDS_SHUFFLED,
  SET_FLASHCARDS_SIDE,
  SAVE_FLASHCARDS_ANSWER,
  PREPARE_WRITE,
  SET_WRITE_IS_INIT,
  SET_WRITE_ANSWER_FIELD,
  SET_WRITE_COPY_ANSWER_FIELD,
  CHECK_WRITE_ANSWER,
  NEXT_WRITE_CARD,
  OVERRIDE_WRITE_ANSWER,
  NEXT_WRITE_ROUND,
  RESET_ALL_GAME_FIELDS,
} from '../../actions/types';
import initialState from './gameInitState';
import { shuffle } from '../../helper-functions';

const GameReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case RESET_ALL_GAME_FIELDS:
      return {
        ...state,
        ...initialState,
      };

    // WRITE
    case PREPARE_WRITE:
      return {
        ...state,
        write: {
          ...state.write,
          all_cards_num: payload.remaining.length,
          remaining: shuffle(payload.remaining).sort((a, b) => b.stage - a.stage),
        },
      };

    case SET_WRITE_IS_INIT:
      return {
        ...state,
        write: {
          ...state.write,
          is_init: payload.value,
        },
      };

    case SET_WRITE_ANSWER_FIELD:
      return {
        ...state,
        write: {
          ...state.write,
          answer: payload.value,
        },
      };

    case SET_WRITE_COPY_ANSWER_FIELD:
      return {
        ...state,
        write: {
          ...state.write,
          copy_answer: payload.value,
        },
      };

    case CHECK_WRITE_ANSWER:
      return {
        ...state,
        write: {
          ...state.write,
          remaining: state.write.remaining.map((item, i, arr) => {
            if (i !== arr.length - 1) {
              return item;
            } else {
              return { ...item, answer: payload.card_answer };
            }
          }),
          answer: payload.answer,
        },
      };

    case NEXT_WRITE_CARD:
      return {
        ...state,
        write: {
          ...state.write,
          answer: '',
          copy_answer: '',
          remaining: state.write.remaining.filter((item, i, arr) => i !== arr.length - 1),
          answered: [
            ...state.write.answered,
            state.write.remaining[state.write.remaining.length - 1],
          ],
        },
      };

    case OVERRIDE_WRITE_ANSWER:
      return {
        ...state,
        write: {
          ...state.write,
          answer: '',
          copy_answer: '',
          remaining: state.write.remaining.filter((item, i, arr) => i !== arr.length - 1),
          answered: [
            ...state.write.answered,
            {
              ...state.write.remaining[state.write.remaining.length - 1],
              answer: 'correct',
            },
          ],
        },
      };

    case NEXT_WRITE_ROUND:
      return {
        ...state,
        write: {
          ...state.write,
          answer: '',
          copy_answer: '',
          remaining: shuffle(
            state.write.answered
              .filter((item) => item.answer === 'incorrect')
              .map((item) => ({ ...item, answer: false }))
          ).sort((a, b) => b.stage - a.stage),
          answered: [],
          rounds: [...state.write.rounds, [...state.write.answered]],
        },
      };

    // FLASCARDS

    case SET_FLASHCARDS_PROGRESS:
      return {
        ...state,
        flashcards: {
          ...state.flashcards,
          progress: state.flashcards.progress + payload.value,
          is_turned: false,
          side: 'definition',
        },
      };

    case RESET_FLASHCARDS_PROGRESS:
      return {
        ...state,
        flashcards: {
          ...state.flashcards,
          progress: 0,
          is_turned: false,
          answers: [],
        },
      };

    case SET_FLASHCARDS_SHUFFLED:
      return {
        ...state,
        flashcards: {
          ...state.flashcards,
          shuffled: payload.value,
        },
      };

    case SET_FLASHCARDS_SIDE:
      return {
        ...state,
        flashcards: {
          ...state.flashcards,
          side: payload.value,
          is_turned: true,
        },
      };

    case SAVE_FLASHCARDS_ANSWER:
      return {
        ...state,
        flashcards: {
          ...state.flashcards,
          answers: [
            ...state.flashcards.answers,
            { id: payload.id, answer: payload.card_answer },
          ],
        },
      };
    default:
      return state;
  }
};

export default GameReducer;
