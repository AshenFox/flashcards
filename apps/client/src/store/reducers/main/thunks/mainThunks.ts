import { mainGetModuleCards } from "@api/methods";
import { ThunkActionApp } from "@store/store";

import { mainActions } from "../slice";

const moduleCardsForEditGame = (_id: string) =>
  mainGetModuleCards({ _id, created: "oldest" });

export const getModuleCards = (_id: string) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        auth: { user },
        main: {
          sections: {
            moduleCards: { loading },
          },
        },
      } = getState();

      if (!user || loading) return;

      dispatch(
        mainActions.setSectionLoading({ value: true, section: "moduleCards" }),
      );

      const data = await moduleCardsForEditGame(_id);

      dispatch(mainActions.setModuleCards(data));
    } catch (err) {
      console.error(err);
    }

    dispatch(
      mainActions.setSectionLoading({ value: false, section: "moduleCards" }),
    );
  });
