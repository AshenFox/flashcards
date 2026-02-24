import { shuffle } from "../../helper-functions";
import gameInitState from "./initState";
import { GameCaseReducer, WriteCards } from "./types";

export const resetAllGameFields: GameCaseReducer = (state, _action) => {
  Object.assign(state, gameInitState);
};

export const prepareFlashcards: GameCaseReducer<{ number: number }> = (
  state,
  action,
) => {
  state.flashcards.all_cards_num = action.payload.number;
};

export const prepareWriteReducer: GameCaseReducer<{ remaining: WriteCards }> = (
  state,
  action,
) => {
  const { payload } = action;
  state.write.all_cards_num = payload.remaining.length;
  state.write.remaining = shuffle(payload.remaining).sort(
    (a, b) => b.stage - a.stage,
  );
};

export const setWriteIsInit: GameCaseReducer<{ value: boolean }> = (
  state,
  action,
) => {
  state.write.is_init = action.payload.value;
};

export const setWriteAnswerField: GameCaseReducer<{ value: string }> = (
  state,
  action,
) => {
  state.write.answer = action.payload.value;
};

export const setWriteCopyAnswerField: GameCaseReducer<{
  value: string;
}> = (state, action) => {
  state.write.copy_answer = action.payload.value;
};

export const checkWriteAnswerReducer: GameCaseReducer<{
  answer: string;
  card_answer: false | "correct" | "incorrect";
}> = (state, action) => {
  const { payload } = action;

  const card = state.write.remaining.at(-1);
  if (card) card.answer = payload.card_answer;

  state.write.answer = payload.answer;
};

export const nextWriteCard: GameCaseReducer<{ override: boolean }> = (state, action) => {
  const { override = false } = action?.payload ?? {};
  const card = state.write.remaining.at(-1);

  state.write.answer = "";
  state.write.copy_answer = "";
  state.write.remaining.pop();

  if (override) card.answer = "correct";
  state.write.answered.push(card);



  if (state.write.remaining.length === 0) {
    const is_game_finished = state.write.answered.filter(item => item.answer === "incorrect").length === 0;
    const is_round_finished = !is_game_finished;

    state.write.is_game_finished = is_game_finished;
    state.write.is_round_finished = is_round_finished;
  }

};

export const nextWriteRound: GameCaseReducer = (state, _action) => {
  state.write.answer = "";
  state.write.copy_answer = "";
  state.write.is_round_finished = false;
  const incorrectCards = state.write.answered
    .filter(item => item.answer === "incorrect")
    .map(item => ({ ...item, answer: false }));

  state.write.rounds.push({
    answered: [...state.write.answered],
    cards_num: state.write.remaining.length + state.write.answered.length,
  });


  state.write.remaining = shuffle(incorrectCards).sort(
    (a, b) => b.stage - a.stage,
  );
  state.write.answered = [];
};

export const setFlashcardsProgressReducer: GameCaseReducer<{
  value: number;
}> = (state, action) => {
  state.flashcards.progress += action.payload.value;
  state.flashcards.is_turned = false;
  state.flashcards.side = "definition";
};

export const resetFlashcardsProgressReducer: GameCaseReducer = (
  state,
  _action,
) => {
  state.flashcards.progress = 0;
  state.flashcards.is_turned = false;
  state.flashcards.answers = [];
};

export const setFlashcardsShuffled: GameCaseReducer<{ value: boolean }> = (
  state,
  action,
) => {
  state.flashcards.shuffled = action.payload.value;
};

export const setFlashcardsSide: GameCaseReducer<{
  value: "definition" | "term";
}> = (state, action) => {
  state.flashcards.side = action.payload.value;
  state.flashcards.is_turned = true;
};

export const saveFlashcardsAnswer: GameCaseReducer<{
  _id: string;
  answer: "correct" | "incorrect";
}> = (state, action) => {
  state.flashcards.answers.push({
    id: action.payload._id,
    answer: action.payload.answer,
  });
};

export const endFlashcardsEarly: GameCaseReducer = (state, _action) => {
  state.flashcards.ended_early = true;
};

export const endWriteEarly: GameCaseReducer = (state, _action) => {
  state.write.ended_early = true;
  state.write.remaining = [];
  state.write.is_round_finished = true;

  const all_cards_num = state.write.answered.length + state.write.rounds.reduce((acc, round) =>
    acc + round.answered.filter(item => item.answer === "correct").length, 0);
  state.write.all_cards_num = all_cards_num;

  const areAllCardsCorrect = !state.write.answered.filter(item => item.answer === "incorrect").length;
  if (areAllCardsCorrect) state.write.is_game_finished = true;
};
