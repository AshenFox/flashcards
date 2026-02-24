import { CardFields, GameState } from "./types";

const gameInitState: GameState = {
  flashcards: {
    progress: 0,
    side: "definition",
    shuffled: false,
    answers: [],
    is_turned: false,
    ended_early: false,
    all_cards_num: 0,
  },
  write: {
    is_init: false,
    is_game_finished: false,
    is_round_finished: false,
    all_cards_num: 0,
    ended_early: false,
    remaining: [],
    answered: [],
    rounds: [],
    answer: "",
    copy_answer: "",
  },
};

export const card_fields: CardFields = {
  answer: false,
};

export default gameInitState;
