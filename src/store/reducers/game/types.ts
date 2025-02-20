import { CaseReducer } from "@reduxjs/toolkit";
import { Action } from "@store/types";

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

export type GameCaseReducer<P = undefined> = CaseReducer<GameState, Action<P>>;
