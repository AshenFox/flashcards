export type FlashcardsAnswer = {
  id: string;
  answer: "correct" | "incorrect";
};

export type CardFields = {
  answer: false | "correct" | "incorrect";
};

export type WriteCard = CardFields & {
  id: string;
  stage: number;
};

export type Round = WriteCard[];

export type GameState = {
  flashcards: {
    progress: number;
    side: "definition" | "term";
    shuffled: boolean;
    answers: FlashcardsAnswer[];
    is_turned: boolean;
  };
  write: {
    is_init: boolean;
    all_cards_num: number;
    remaining: Round;
    answer: string;
    copy_answer: string;
    answered: Round;
    rounds: Round[];
  };
};

// =========================

const gameInitState: GameState = {
  flashcards: {
    progress: 0,
    side: "definition",
    shuffled: false,
    answers: [],
    is_turned: false,
  },
  write: {
    is_init: false,
    all_cards_num: 0,
    remaining: [],
    answer: "",
    copy_answer: "",
    answered: [],
    rounds: [],
  },
};

export const card_fields: CardFields = {
  answer: false,
};

export default gameInitState;
