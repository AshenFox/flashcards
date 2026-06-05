import {
  CardDto,
  GetMainModuleCardsResponseDto,
} from "@flashcards/common";

import { card_fields } from "../initState";
import { Cards, MainCaseReducer } from "../types";

export const setIsServer: MainCaseReducer = state => {
  state.is_server = typeof document === "undefined";
};

export const resetModuleData: MainCaseReducer = (state, _action) => {
  state.cards = {};
};

export const resetModuleCardsData: MainCaseReducer = state => {
  state.cards = {};
};

export const setModuleCards: MainCaseReducer<GetMainModuleCardsResponseDto> = (
  state,
  action,
) => {
  state.cards = { ...state.cards, ...cardArrToObj(action.payload.entries) };
};

export const setSectionLoading: MainCaseReducer<{
  value: boolean;
  section: "srCards" | "moduleCards";
}> = (state, action) => {
  const { value, section } = action.payload;

  state.sections[section].loading = value;
};

const cardArrToObj = (arr: CardDto[]): Cards => {
  return Object.fromEntries(
    arr.map(card => [
      card._id,
      {
        ...card,
        ...card_fields,
      },
    ]),
  );
};
