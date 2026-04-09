import {
  editGetDraft,
  mainGetCards,
  mainGetModule,
  mainGetModuleCards,
} from "@api/methods";
import { GetMainCardsQueryDto } from "@flashcards/common";
import { ThunkActionApp } from "@store/store";

import { mainActions } from "../slice";

const moduleCardsForEditGame = (_id: string) =>
  mainGetModuleCards({ _id, created: "oldest" });

export const getCards = () => <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        auth: { user },
        main: {
          sections: {
            homeCards: {
              loading,
              filters,
              pagination: { end, page },
            },
          },
        },
      } = getState();
      if (!user || end || loading) return;

      dispatch(
        mainActions.setSectionLoading({ value: true, section: "homeCards" }),
      );

      const params: GetMainCardsQueryDto = {
        page,
        ...filters,
      };

      const data = await mainGetCards(params);

      dispatch(mainActions.setCards(data));
    } catch (err) {
      console.error(err);
    }

    dispatch(
      mainActions.setSectionLoading({ value: false, section: "homeCards" }),
    );
  });

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

export const getModule = (_id: string) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        auth: { user },
        main: {
          sections: {
            module: { loading },
          },
        },
      } = getState();

      if (!user || loading) return;

      dispatch(
        mainActions.setSectionLoading({ value: true, section: "module" }),
      );

      const moduleRes = await mainGetModule({ _id });
      dispatch(mainActions.setModule(moduleRes));

      const cardsRes = await moduleCardsForEditGame(_id);
      dispatch(mainActions.setModuleCards(cardsRes));
    } catch (err) {
      window.location.replace(`/home/modules`);
      console.error(err);
    }

    dispatch(
      mainActions.setSectionLoading({ value: false, section: "module" }),
    );
  });

export const getDraft = () => <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        auth: { user },
        main: {
          sections: {
            editDraft: { loading },
          },
        },
      } = getState();

      if (!user || loading) return;

      dispatch(
        mainActions.setSectionLoading({ value: true, section: "editDraft" }),
      );

      const data = await editGetDraft();
      dispatch(mainActions.setModule(data));

      const draftId = String(data.module._id);
      const cardsRes = await moduleCardsForEditGame(draftId);
      dispatch(mainActions.setModuleCards(cardsRes));
    } catch (err) {
      window.location.replace(`/home/modules`);
      console.error(err);
    }

    dispatch(
      mainActions.setSectionLoading({ value: false, section: "editDraft" }),
    );
  });
