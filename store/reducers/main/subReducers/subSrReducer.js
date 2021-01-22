import {
  DROP_CARD_SR,
  DROP_CARDS_SR,
  SET_CARD_SR,
  SET_CARDS_SR,
  SET_CARDS_SR_POSITIVE,
  GET_SR_CARDS,
  PUT_SR_ANSWER,
} from '../../../actions/types';
import initialState from '../mainInitState';

const subSrReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_CARD_SR:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            studyRegime: payload.value,
          },
        },
      };

    case SET_CARDS_SR:
      return {
        ...state,
        cards: Object.fromEntries(
          Object.entries(state.cards).map(([_id, card]) => [
            _id,
            { ...card, studyRegime: payload.value },
          ])
        ),
      };

    case SET_CARDS_SR_POSITIVE:
      return {
        ...state,
        cards: Object.fromEntries(
          Object.entries(state.cards).map(([_id, card]) => {
            if (payload._id_arr.includes(_id)) {
              return [_id, { ...card, studyRegime: true }];
            } else {
              return [_id, card];
            }
          })
        ),
      };

    case DROP_CARD_SR:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            stage: payload.stage,
            nextRep: payload.nextRep,
            prevStage: payload.prevStage,
            lastRep: payload.lastRep,
          },
        },
      };

    case PUT_SR_ANSWER:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload._id]: {
            ...state.cards[payload._id],
            stage: payload.stage,
            nextRep: payload.nextRep,
            prevStage: payload.prevStage,
            lastRep: payload.lastRep,
            studyRegime: payload.studyRegime,
          },
        },
      };

    case DROP_CARDS_SR:
      return {
        ...state,
        cards: Object.fromEntries(
          Object.entries(state.cards).map(([_id, card]) => [
            _id,
            {
              ...card,
              stage: payload.stage,
              nextRep: payload.nextRep,
              prevStage: payload.prevStage,
              lastRep: payload.lastRep,
            },
          ])
        ),
      };

    case GET_SR_CARDS:
      return {
        ...state,
        cards: Object.fromEntries(shuffle(Object.entries(payload.cards))),
      };
    default:
      return false;
  }
};

export default subSrReducer;

// ==============================
// ==============================
// ==============================

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};
