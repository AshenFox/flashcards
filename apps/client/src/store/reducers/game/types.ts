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

export type WriteCards = WriteCard[];

export type WriteRound = {
  answered: WriteCards;
  cards_num: number;
};

export type GameState = {
  flashcards: {
    progress: number;
    side: "definition" | "term";
    shuffled: boolean;
    answers: FlashcardsAnswer[];
    is_turned: boolean;
    ended_early: boolean;
  };
  write: {
    is_init: boolean;
    is_game_finished: boolean;
    is_round_finished: boolean;
    ended_early: boolean;
    all_cards_num: number;
    remaining: WriteCards;
    answer: string;
    copy_answer: string;
    answered: WriteCards;
    rounds: WriteRound[];
  };
};

export type GameCaseReducer<P = undefined> = CaseReducer<GameState, Action<P>>;
