import { CardDto } from "@flashcards/common";
import { axiosInstance } from "@flashcards/common";
import { saveLastUpdate } from "@store/helper-functions";
import { ThunkActionApp } from "@store/store";
import sanitize from "sanitize-html";

import { url_fields } from "../initState";
import { mainActions } from "../slice";
import {
  CodDictResult,
  CodReply,
  ImgurlBase,
  ImgurlObjs,
  UrbanDictResult,
  UrbanReply,
} from "../types";

export const setCardsSavePositive = (_id: string) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    const {
      main: { cards },
    } = getState();

    const cards_arr = Object.values(cards);
    let _id_arr: string[] = [];

    for (const card of cards_arr) {
      if (card._id === _id) {
        _id_arr.push(card._id);
        break;
      }
      if (card.save) {
        _id_arr = [];
      } else {
        _id_arr.push(card._id);
      }
    }

    dispatch(
      mainActions.setCardsSavePositiveReducer({
        _id_arr,
      }),
    );
  });

export const scrapeDictionary = (_id: string, value: "cod" | "urban") =>
  <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        main: { cards },
      } = getState();

      const { term } = cards[_id];

      if (!term) throw new Error("Term field can not be empty.");

      dispatch(mainActions.setScrapeLoading({ _id, value: true }));

      const term_without_tags = term.replace(/<[^>]*>/g, "");

      let query: string;

      if (value === "cod") query = term_without_tags.replace(/\s+/g, "-");
      if (value === "urban") query = term_without_tags.replace(/\s+/g, "+");

      const url = `/api/scrape/${value}`;
      const params = {
        params: {
          query,
        },
      };

      let result: string;

      if (value === "cod") {
        const { data } = await axiosInstance.get<CodReply>(url, params);
        result = sanitize(format_dictionary_result({ type: "cod", data }));
      }

      if (value === "urban") {
        const { data } = await axiosInstance.get<UrbanReply>(url, params);
        result = sanitize(format_dictionary_result({ type: "urban", data }));
      }

      dispatch(mainActions.scrapeDictionaryReducer({ _id, result }));

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }

    dispatch(mainActions.setScrapeLoading({ _id, value: false }));
    dispatch(editCard(_id));
  });

export const setUrlOk = (_id: string, index: string, value: boolean) =>
  <ThunkActionApp>(async (dispatch, getState) => {
    const {
      main: { cards },
    } = getState();

    let { loaded, failed } = cards[_id].gallery;

    const payload = {
      _id,
      index,
      value,
      loaded,
      failed,
    };

    if (value) payload.loaded = loaded + 1;
    if (!value) payload.failed = failed + 1;

    dispatch(mainActions.setGalleryWidth({ _id, value: payload.loaded }));
    dispatch(mainActions.setUrlOkReducer(payload));
  });

export const searchImages = (_id: string) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        main: { cards },
      } = getState();

      const query = cards[_id].gallery.query;

      if (!query) return console.error("Query can not be empty.");

      const regexpURL = /^@url - /;

      const isURL = regexpURL.test(query);

      dispatch(mainActions.setGalleryLoading({ _id, value: true }));

      if (isURL) {
        const url = query.replace(regexpURL, "").trim();

        if (!url) return console.error("Query can not be empty.");

        dispatch(
          mainActions.searchImagesReducer({
            _id,
            imgurl_obj: imgUrlArrToObj([{ url }]),
            all: 1,
          }),
        );
      } else {
        let { data }: { data: ImgurlBase[] } = await axiosInstance.get(
          "/api/imgsearch",
          {
            params: {
              query,
            },
          },
        );

        const all = data.length;
        const imgurl_obj = imgUrlArrToObj(data);

        dispatch(mainActions.searchImagesReducer({ _id, imgurl_obj, all }));
      }
    } catch (err) {
      console.error(err);
      dispatch(mainActions.setGalleryError({ _id, value: true }));
    }

    dispatch(mainActions.setGalleryLoading({ _id, value: false }));
  });

export const deleteModule = _id => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        auth: { user },
        main: { module },
      } = getState();
      const module_loading = module && module.module_loading;

      if (!user || module_loading) return;
      dispatch(mainActions.setModuleLoading({ value: true }));

      await axiosInstance.delete<{ msg: string }>("/api/edit/module", {
        params: {
          _id,
        },
      });

      saveLastUpdate();
      window.location.replace(`/home/modules`);
    } catch (err) {
      console.error(err);
    }

    dispatch(mainActions.setModuleLoading({ value: false }));
  });

export const deleteCard = (_id: string) => <ThunkActionApp>(async (
    dispatch,
    getState,
  ) => {
    try {
      const {
        auth: { user },
      } = getState();
      if (!user) return;

      const res = await axiosInstance.delete<{ msg: string; cards: CardDto[] }>(
        "/api/edit/card",
        {
          params: {
            _id,
          },
        },
      );

      dispatch(mainActions.deleteCardReducer({ cards: res.data.cards }));

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

export const editModule = () => <ThunkActionApp>(async (_, getState) => {
    try {
      const {
        auth: { user },
        main: { module },
      } = getState();

      if (!user) return;

      await axiosInstance.put<{ msg: string }>("/api/edit/module", module);

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

export const editCard = (_id: string) => <ThunkActionApp>(async (
    _,
    getState,
  ) => {
    try {
      const {
        auth: { user },
        main: { cards },
      } = getState();
      if (!user) return;

      await axiosInstance.put<{ msg: string }>("/api/edit/card", cards[_id]);

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

export const createModule = (saveAllCards: boolean = false) =>
  <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        auth: { user },
        main: { cards, module },
      } = getState();

      const module_loading = module && module.module_loading;

      if (!user || module_loading) return;

      dispatch(mainActions.setModuleLoading({ value: true }));

      const _id_arr = [];

      const cards_arr = Object.values(cards);

      for (const card of cards_arr) {
        if (card.save || saveAllCards) _id_arr.push(card._id);
      }

      await axiosInstance.post<{ msg: string }>("/api/edit/module", {
        _id_arr,
      });

      window.location.replace("/home/modules");
      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }

    dispatch(mainActions.setModuleLoading({ value: false }));
  });

export const createCard = (position: "start" | "end") =>
  <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        auth: { user },
        main: { module },
      } = getState();
      if (!user) return;

      const res = await axiosInstance.post<{ cards: CardDto[] }>(
        "/api/edit/card",
        {
          module,
          position,
        },
      );

      dispatch(mainActions.createCardReducer({ cards: res.data.cards }));

      saveLastUpdate();

      if (position === "end") {
        const scrollHeight = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.body.clientHeight,
          document.documentElement.clientHeight,
        );

        window.scrollTo({
          behavior: "smooth",
          top: scrollHeight,
        });
      }
    } catch (err) {
      console.error(err);
    }
  });

export const exportSelectedCards = () => <ThunkActionApp>(async (
    _,
    getState,
  ) => {
    try {
      const {
        main: { cards },
      } = getState();

      const selectedCards = Object.values(cards)
        .filter(card => card.save)
        .map(card => {
          const exportCard = {
            _id: card._id,
            moduleID: card.moduleID,
            term: card.term,
            definition: card.definition,
            imgurl: card.imgurl,
            author_id: card.author_id,
            author: card.author,
          };

          return exportCard;
        });

      if (selectedCards.length === 0) {
        console.error("No cards selected for export");
        return;
      }

      const dataStr = JSON.stringify(selectedCards, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

      const exportFileDefaultName = `flashcards_export_${new Date().toISOString().slice(0, 10)}_${new Date().toLocaleTimeString().replace(/:/g, "-")}.json`;

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
    } catch (err) {
      console.error("Error exporting cards:", err);
    }
  });

// ==============================
// ==============================
// ======== Supplemental ========
// ==============================
// ==============================

export const imgUrlArrToObj = (arr: ImgurlBase[]): ImgurlObjs => {
  return Object.fromEntries(
    arr.map((url, i) => [
      i,
      {
        ...url,
        ...url_fields,
      },
    ]),
  );
};

const format_dictionary_result = (
  result: CodDictResult | UrbanDictResult,
): string => {
  const { type, data } = result;

  let divider = "<br><div>-------</div><br>";
  let br = "<br>";

  let formattedResult = divider;

  const wrap_in = (str?: string, el?: "div"): string => {
    if (!str) return "";

    switch (el) {
      case "div":
        return `<${el}>` + str + `</${el}>`;
      default:
        return `( ` + str + ` )`;
    }
  };

  // cod
  if (type === "cod") {
    data.map(sect => {
      let { part_of_speech, transcr_uk, transcr_us, sub_sections } = sect;

      sub_sections.map(sub_sect => {
        let { guideword, blocks } = sub_sect;

        blocks.map(block => {
          let { definition, examples } = block;

          let examplesHtml = "";
          examples.map(example => {
            examplesHtml = examplesHtml + wrap_in(example, "div");
          });

          let definitionHtml = wrap_in(
            guideword.concat(wrap_in(definition)),
            "div",
          );

          let additionalInfoHtml = wrap_in(
            wrap_in(transcr_us).concat(wrap_in(part_of_speech), wrap_in()),
            "div",
          );

          formattedResult = formattedResult.concat(
            examplesHtml,
            br,
            definitionHtml,
            additionalInfoHtml,
            divider,
          );
        });
      });
    });

    // urban
  } else if (type === "urban") {
    data.map(panel => {
      let { definition, example } = panel;

      formattedResult = formattedResult.concat(
        wrap_in(example, "div"),
        br,
        wrap_in(wrap_in(definition), "div"),
        divider,
      );
    });
  }

  return formattedResult;
};
