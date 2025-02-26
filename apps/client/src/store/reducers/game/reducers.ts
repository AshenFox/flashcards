import { shuffle } from "../../helper-functions";
import gameInitState from "./initState";
import { GameCaseReducer, Round } from "./types";

export const resetAllGameFields: GameCaseReducer = (state, _action) => {
  Object.assign(state, gameInitState);
};

export const prepareWriteReducer: GameCaseReducer<{ remaining: Round }> = (
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
  const lastIndex = state.write.remaining.length - 1;
  state.write.remaining = state.write.remaining.map((item, index) =>
    index === lastIndex ? { ...item, answer: payload.card_answer } : item,
  );
  state.write.answer = payload.answer;
};

export const nextWriteCard: GameCaseReducer = (state, _action) => {
  const lastIndex = state.write.remaining.length - 1;
  const lastCard = state.write.remaining[lastIndex];
  state.write.answer = "";
  state.write.copy_answer = "";
  state.write.remaining.splice(lastIndex, 1);
  state.write.answered.push(lastCard);
};

export const overrideWriteAnswer: GameCaseReducer = (state, _action) => {
  const lastIndex = state.write.remaining.length - 1;
  const lastCard = state.write.remaining[lastIndex];
  state.write.answer = "";
  state.write.copy_answer = "";
  state.write.remaining.splice(lastIndex, 1);
  state.write.answered.push({ ...lastCard, answer: "correct" });
};

export const nextWriteRound: GameCaseReducer = (state, _action) => {
  state.write.answer = "";
  state.write.copy_answer = "";
  const incorrectCards = state.write.answered
    .filter(item => item.answer === "incorrect")
    .map(item => ({ ...item, answer: false }));
  state.write.remaining = shuffle(incorrectCards).sort(
    (a, b) => b.stage - a.stage,
  );
  state.write.rounds.push([...state.write.answered]);
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
