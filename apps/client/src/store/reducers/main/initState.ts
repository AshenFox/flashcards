import { CardFields, MainState } from "./types";

export const card_fields: CardFields = {
  edit: false,
  question: false,
};

const initState: MainState = {
  is_server: true,

  cards: {},

  sections: {
    srCards: { loading: false },
    moduleCards: { loading: false },
  },
};

export default initState;
