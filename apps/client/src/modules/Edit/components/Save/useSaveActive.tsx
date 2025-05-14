import { useEditContext } from "@modules/Edit/context";
import { useAppSelector } from "@store/store";

export const useSaveState = () => {
  const { selectionActive } = useEditContext();
  const currentModule = useAppSelector(s => s.main.module);
  const cards = useAppSelector(s => s.main.cards);

  const { title, module_loading: loading, draft } = currentModule || {};

  const cardsArr = Object.values(cards);

  let twoSaved = false;
  let counter = 0;

  if (draft && selectionActive) {
    for (const card of cardsArr) {
      if (card.save === true) {
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
