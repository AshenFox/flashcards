import { useEditContext } from "@modules/Edit/context";
import {
  useEditCards,
  useEditCardsUIStore,
  useEditIsLoading,
  useEditModule,
} from "@modules/Edit/hooks";

export const useSaveState = () => {
  const { selectionActive } = useEditContext();
  const editModule = useEditModule();
  const cardsArr = useEditCards();
  const cardsUi = useEditCardsUIStore(s => s.cards);
  const loading = useEditIsLoading();

  const { title, draft } = editModule || {};

  let twoSaved = false;
  let counter = 0;

  if (draft && selectionActive) {
    for (const card of cardsArr) {
      if (cardsUi[card._id]?.save === true) {
        ++counter;
        if (counter >= 2) {
          twoSaved = true;
          break;
        }
      }
    }
  } else {
    twoSaved = true;
  }

  let active = draft ? !!(twoSaved && title) : !!title;
  if (!cardsArr.length) active = true;

  return {
    active,
    loading,
  };
};
