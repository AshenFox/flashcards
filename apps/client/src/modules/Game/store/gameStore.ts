import type { CardDto } from "@flashcards/common";
import { createStoreHook, withActionName } from "@store/helpers";
import { Slice } from "@store/types";
import { shuffle } from "@utils/shuffle";
import type { WritableDraft } from "immer";

import type { GameState } from "./types";

export type {
  FlashcardsAnswer,
  GameState,
  WriteCard,
  WriteCards,
  WriteRound,
} from "./types";

const cardFields = {
  answer: false as const,
};

type GamePrepareSlice = Pick<GameStore, "flashcards" | "write" | "orderIds">;

const buildOrderIds = (cards: CardDto[], mode: "module" | "sr"): string[] => {
  if (mode === "module") {
    return cards.map(c => c._id);
  }

  const entries = shuffle(cards.map(c => [c._id, c] as const)).sort(
    (a, b) => a[1].stage - b[1].stage,
  );
  return entries.map(([id]) => id);
};

const applyPrepareFlashcards = (
  state: WritableDraft<GameStore | Partial<GameStore>>,
) => {
  const cards_num = state.orderIds.length;
  state.flashcards = { ...gameInitState.flashcards };
  state.flashcards.all_cards_num = cards_num;
};

const applyPrepareWrite = (
  state: WritableDraft<GameStore | Partial<GameStore>>,
  cardsById: Record<string, CardDto>,
) => {
  const remaining = state.orderIds.map(id => ({
    id,
    stage: cardsById[id]?.stage ?? 0,
    ...cardFields,
  }));

  state.write = {
    ...gameInitState.write,
    remaining: [],
    answered: [],
    rounds: [],
  };
  state.write.all_cards_num = remaining.length;
  state.write.remaining = shuffle(remaining).sort((a, b) => b.stage - a.stage);
  state.write.is_init = true;
};

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

export type GameStore = GameState & {
  orderIds: string[];
  resetAllGameFields: () => void;
  prepareFlashcards: () => void;
  prepareWrite: (cardsById: Record<string, CardDto>) => void;
  setWriteIsInit: (value: boolean) => void;
  setWriteAnswerField: (value: string) => void;
  setWriteCopyAnswerField: (value: string) => void;
  checkWriteAnswerReducer: (payload: {
    answer: string;
    card_answer: "correct" | "incorrect";
  }) => void;
  nextWriteCard: (override?: boolean) => void;
  nextWriteRound: () => void;
  setFlashcardsProgress: (value: "next" | "prev") => void;
  resetFlashcardsProgress: () => void;
  setFlashcardsShuffled: (value: boolean) => void;
  setFlashcardsSide: (value: "definition" | "term") => void;
  saveFlashcardsAnswer: (payload: {
    _id: string;
    answer: "correct" | "incorrect";
  }) => void;
  endFlashcardsEarly: () => void;
  endWriteEarly: () => void;
  initFromCards: (cards: CardDto[], mode: "module" | "sr") => void;
  initAndPrepareFlashcards: (cards: CardDto[], mode: "module" | "sr") => void;
  initAndPrepareWrite: (cards: CardDto[], mode: "module" | "sr") => void;
  shuffleOrder: (cardsById: Record<string, CardDto>) => void;
  sortOrder: (cardsById: Record<string, CardDto>) => void;
  resetOrder: () => void;
};

const createGameSlice: Slice<GameStore> = setAction => {
  const set = withActionName(setAction);

  return {
    ...gameInitState,
    orderIds: [],

    resetAllGameFields: () => {
      set(state => {
        state.flashcards = { ...gameInitState.flashcards };
        state.write = {
          ...gameInitState.write,
          remaining: [],
          answered: [],
          rounds: [],
        };
      }, "resetAllGameFields");
    },

    prepareFlashcards: () => {
      set(state => {
        applyPrepareFlashcards(state);
      }, "prepareFlashcards");
    },

    prepareWrite: cardsById => {
      set(state => {
        applyPrepareWrite(state, cardsById);
      }, "prepareWrite");
    },

    setWriteIsInit: value => {
      set(state => {
        state.write.is_init = value;
      }, "setWriteIsInit");
    },

    setWriteAnswerField: value => {
      set(state => {
        state.write.answer = value;
      }, "setWriteAnswerField");
    },

    setWriteCopyAnswerField: value => {
      set(state => {
        state.write.copy_answer = value;
      }, "setWriteCopyAnswerField");
    },

    checkWriteAnswerReducer: payload => {
      set(state => {
        const card = state.write.remaining.at(-1);
        if (card) card.answer = payload.card_answer;
        state.write.answer = payload.answer;
      }, "checkWriteAnswerReducer");
    },

    nextWriteCard: (override = false) => {
      set(state => {
        const card = state.write.remaining.at(-1);
        if (!card) return;

        state.write.answer = "";
        state.write.copy_answer = "";
        state.write.remaining.pop();

        if (override) card.answer = "correct";
        state.write.answered.push(card);

        if (state.write.remaining.length === 0) {
          const is_game_finished =
            state.write.answered.filter(item => item.answer === "incorrect")
              .length === 0;
          state.write.is_game_finished = is_game_finished;
          state.write.is_round_finished = !is_game_finished;
        }
      }, "nextWriteCard");
    },

    nextWriteRound: () => {
      set(state => {
        state.write.answer = "";
        state.write.copy_answer = "";
        state.write.is_round_finished = false;

        const incorrectCards = state.write.answered
          .filter(item => item.answer === "incorrect")
          .map(item => ({ ...item, answer: false as const }));

        state.write.rounds.push({
          answered: [...state.write.answered],
          cards_num: state.write.remaining.length + state.write.answered.length,
        });

        state.write.remaining = shuffle(incorrectCards).sort(
          (a, b) => b.stage - a.stage,
        );
        state.write.answered = [];
      }, "nextWriteRound");
    },

    setFlashcardsProgress: value => {
      set(state => {
        if (value === "next") {
          if (state.flashcards.progress >= state.orderIds.length) return;
          state.flashcards.progress += 1;
        } else if (value === "prev") {
          if (state.flashcards.progress <= 0) return;
          state.flashcards.progress -= 1;
        }

        state.flashcards.is_turned = false;
        state.flashcards.side = "definition";
      }, "setFlashcardsProgress");
    },

    resetFlashcardsProgress: () => {
      set(state => {
        state.flashcards.side = "definition";
        state.flashcards.progress = 0;
        state.flashcards.is_turned = false;
        state.flashcards.answers = [];
      }, "resetFlashcardsProgress");
    },

    setFlashcardsShuffled: value => {
      set(state => {
        state.flashcards.shuffled = value;
      }, "setFlashcardsShuffled");
    },

    setFlashcardsSide: value => {
      set(state => {
        state.flashcards.side = value;
        state.flashcards.is_turned = true;
      }, "setFlashcardsSide");
    },

    saveFlashcardsAnswer: payload => {
      set(state => {
        state.flashcards.answers.push({
          id: payload._id,
          answer: payload.answer,
        });
      }, "saveFlashcardsAnswer");
    },

    endFlashcardsEarly: () => {
      set(state => {
        state.flashcards.ended_early = true;
        state.flashcards.all_cards_num = state.flashcards.progress;
      }, "endFlashcardsEarly");
    },

    endWriteEarly: () => {
      set(state => {
        state.write.ended_early = true;
        state.write.remaining = [];
        state.write.is_round_finished = true;

        state.write.all_cards_num =
          state.write.answered.length +
          state.write.rounds.reduce(
            (acc, round) =>
              acc +
              round.answered.filter(item => item.answer === "correct").length,
            0,
          );

        const areAllCardsCorrect = !state.write.answered.filter(
          item => item.answer === "incorrect",
        ).length;
        if (areAllCardsCorrect) state.write.is_game_finished = true;
      }, "endWriteEarly");
    },

    initFromCards: (cards, mode) => {
      set(state => {
        state.orderIds = buildOrderIds(cards, mode);
      }, "initFromCards");
    },

    initAndPrepareFlashcards: (cards, mode) => {
      set(state => {
        state.orderIds = buildOrderIds(cards, mode);
        applyPrepareFlashcards(state as WritableDraft<GamePrepareSlice>);
      }, "initAndPrepareFlashcards");
    },

    initAndPrepareWrite: (cards, mode) => {
      set(state => {
        state.orderIds = buildOrderIds(cards, mode);
        const cardsById = Object.fromEntries(cards.map(c => [c._id, c]));
        applyPrepareWrite(state as WritableDraft<GamePrepareSlice>, cardsById);
      }, "initAndPrepareWrite");
    },

    shuffleOrder: cardsById => {
      set(state => {
        state.orderIds = shuffle([...state.orderIds]).sort(
          (a, b) => (cardsById[a]?.stage ?? 0) - (cardsById[b]?.stage ?? 0),
        );
      }, "shuffleOrder");
    },

    sortOrder: cardsById => {
      set(state => {
        state.orderIds = [...state.orderIds].sort(
          (a, b) =>
            new Date(cardsById[a]?.creation_date ?? 0).getTime() -
            new Date(cardsById[b]?.creation_date ?? 0).getTime(),
        );
      }, "sortOrder");
    },

    resetOrder: () => {
      set(state => {
        state.orderIds = [];
      }, "resetOrder");
    },
  };
};

export const useGameStore = createStoreHook({
  storeName: "Game",
  instanceKey: "game",
  slice: createGameSlice,
});
