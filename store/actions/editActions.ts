import { Card, CardBase, ImgurlBase, ImgurlObjs } from './../reducers/main/mainInitState';
import { AppActions } from './../types/types';
import { ThunkActionApp } from './../store';
import {
  SET_CARD_EDIT,
  CONTROL_CARD,
  CONTROL_MODULE,
  SET_GALLERY_SEARCH,
  CONTROL_GALLERY_QUERY,
  SEARCH_IMAGES,
  SET_URL_OK,
  RESET_GALLERY_FIELDS,
  SET_GALLERY_LOADING,
  MOVE_GALLERY,
  SET_GALLERY_WIDTH,
  SET_CARD_IMGURL,
  SCRAPE_DICTIONARY,
  SET_SCRAPE_LOADING,
  SET_GALLERY_ERROR,
  DELETE_MODULE,
  DELETE_CARD,
  EDIT_MODULE,
  EDIT_CARD,
  CREATE_MODULE,
  CREATE_CARD,
  SET_CARD_SAVE,
  SET_CARDS_SAVE,
  SET_CARDS_SAVE_POSITIVE,
  SET_MODULE_QUESTION,
  SET_CARD_QUESTION,
  SET_MODULE_LOADING,
} from '../types/types';
import { url_fields } from '../reducers/main/mainInitState';
import { card_fields } from '../reducers/main/mainInitState';
import axios from '../../server/supplemental/axios';
import { saveLastUpdate } from '../helper-functions';

// SET_CARDS_SAVE_POSITIVE
export const set_cards_save_positive = (_id: string) => <ThunkActionApp>(async (
    dispatch,
    getState
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

    dispatch({
      type: SET_CARDS_SAVE_POSITIVE,
      payload: {
        _id_arr,
      },
    });
  });

// SET_CARDS_SAVE
export const set_cards_save = (value: boolean): AppActions => ({
  type: SET_CARDS_SAVE,
  payload: {
    value,
  },
});

// SET_CARD_SAVE
export const set_card_save = (_id: string, value: boolean): AppActions => ({
  type: SET_CARD_SAVE,
  payload: {
    _id,
    value,
  },
});

// SET_MODULE_LOADING
export const set_module_loading = (value: boolean): AppActions => ({
  type: SET_MODULE_LOADING,
  payload: {
    value,
  },
});

// SET_MODULE_QUESTION
export const set_module_question = (value: boolean): AppActions => ({
  type: SET_MODULE_QUESTION,
  payload: {
    value,
  },
});

// SET_CARD_QUESTION
export const set_card_question = (_id: string, value: boolean): AppActions => ({
  type: SET_CARD_QUESTION,
  payload: {
    _id,
    value,
  },
});

// SET_GALLERY_ERROR
export const set_gallery_error = (_id: string, value: boolean): AppActions => ({
  type: SET_GALLERY_ERROR,
  payload: {
    _id,
    error: value,
  },
});

// SCRAPE_DICTIONARY
export const scrape_dictionary = (_id: string, value: 'cod' | 'urban') =>
  <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        main: { cards },
      } = getState();

      const { term } = cards[_id];

      if (!term) throw new Error('Term field can not be empty.');

      dispatch(set_scrape_loading(_id, true));

      const term_without_tags = term.replace(/<[^>]*>/g, '');

      let query: string;

      if (value === 'cod') query = term_without_tags.replace(/\s+/g, '-');
      if (value === 'urban') query = term_without_tags.replace(/\s+/g, '+');

      const url = `/api/scrape/${value}`;
      const params = {
        params: {
          query,
        },
      };

      let result: string;

      if (value === 'cod') {
        const { data }: { data: CodReply } = await axios.get(url, params);
        result = format_dictionary_result({ type: 'cod', data });
      }

      if (value === 'urban') {
        const { data }: { data: UrbanReply } = await axios.get(url, params);
        result = format_dictionary_result({ type: 'urban', data });
      }

      dispatch({
        type: SCRAPE_DICTIONARY,
        payload: {
          _id,
          result,
        },
      });

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }

    dispatch(set_scrape_loading(_id, false));
    dispatch(edit_card(_id));
  });

// SET_CARD_IMGURL
export const set_card_imgurl = (_id: string, value: string): AppActions => ({
  type: SET_CARD_IMGURL,
  payload: {
    _id,
    imgurl: value,
  },
});

// SET_GALLERY_WIDTH
export const set_gallery_width = (_id: string, value: number): AppActions => {
  const width = 2 + 15 * value + 2 * (value - 1);

  return {
    type: SET_GALLERY_WIDTH,
    payload: {
      _id,
      width,
    },
  };
};

// MOVE_GALLERY
export const move_gallery = (_id: string, value: 'left' | 'right'): AppActions => {
  let offset = 0;
  if (value === 'left') offset = 17;
  if (value === 'right') offset = -17;

  return {
    type: MOVE_GALLERY,
    payload: {
      _id,
      offset,
    },
  };
};

// SET_GALLERY_LOADING
export const set_gallery_loading = (_id: string, value: boolean): AppActions => ({
  type: SET_GALLERY_LOADING,
  payload: {
    _id,
    loading: value,
  },
});

// SET_SCRAPE_LOADING
export const set_scrape_loading = (_id: string, value: boolean): AppActions => ({
  type: SET_SCRAPE_LOADING,
  payload: {
    _id,
    loading: value,
  },
});

// RESET_GALLERY_FIELDS
export const reset_gallery_fields = (_id: string): AppActions => ({
  type: RESET_GALLERY_FIELDS,
  payload: {
    _id,
  },
});

// SET_URL_OK
export const set_url_ok = (_id: string, index: string, value: boolean) =>
  <ThunkActionApp>(async (dispatch, getState) => {
    const {
      main: { cards },
    } = getState();

    let { loaded, failed, all, loading } = cards[_id].gallery;

    const payload = {
      _id,
      index,
      value,
      loaded,
      failed,
    };

    if (value) payload.loaded = loaded + 1;
    if (!value) payload.failed = failed + 1;

    dispatch(set_gallery_width(_id, payload.loaded));

    dispatch({
      type: SET_URL_OK,
      payload,
    });
  });

// SET_CARD_EDIT
export const set_card_edit = (_id: string, value: boolean): AppActions => ({
  type: SET_CARD_EDIT,
  payload: {
    _id,
    value,
  },
});

// SET_GALLERY_SEARCH
export const set_gallery_search = (_id: string, value: boolean): AppActions => ({
  type: SET_GALLERY_SEARCH,
  payload: {
    _id,
    value,
  },
});

// CONTROL_CARD
export const control_card = (
  _id: string,
  type: 'term' | 'defenition',
  value: string
): AppActions => ({
  type: CONTROL_CARD,
  payload: {
    _id,
    type,
    value,
  },
});

// CONTROL_MODULE
export const control_module = (value: string): AppActions => ({
  type: CONTROL_MODULE,
  payload: {
    value,
  },
});

// CONTROL_GALLERY_QUERY
export const control_gallery_query = (_id: string, value: string): AppActions => ({
  type: CONTROL_GALLERY_QUERY,
  payload: {
    _id,
    value,
  },
});

// SEARCH_IMAGES
export const search_images = (_id: string) => <ThunkActionApp>(async (
    dispatch,
    getState
  ) => {
    try {
      const {
        main: { cards },
      } = getState();

      const query = cards[_id].gallery.query;

      if (!query) return console.error('Query can not be empty.');

      const regexpURL = /^@url - /;

      const isURL = regexpURL.test(query);

      dispatch(set_gallery_loading(_id, true));

      if (isURL) {
        const url = query.replace(regexpURL, '').trim();

        if (!url) return console.error('Query can not be empty.');

        // console.log(queryURL);

        dispatch({
          type: SEARCH_IMAGES,
          payload: {
            _id,
            imgurl_obj: arr_to_obj([{ url }]),
            all: 1,
          },
        });
      } else {
        let { data }: { data: ImgurlBase[] } = await axios.get('/api/imgsearch', {
          params: {
            query,
          },
        });

        const all = data.length;
        const imgurl_obj = arr_to_obj(data);

        dispatch({
          type: SEARCH_IMAGES,
          payload: {
            _id,
            imgurl_obj,
            all,
          },
        });
      }

      dispatch(set_gallery_loading(_id, false));
    } catch (err) {
      console.error(err);
      dispatch(set_gallery_error(_id, true));
    }

    dispatch(set_gallery_loading(_id, false));
  });

// DELETE_MODULE

export const delete_module = (_id) => <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        auth: { user },
        main: { module },
      } = getState();
      const module_loading = module && module.module_loading;

      if (!user || module_loading) return;
      dispatch(set_module_loading(true));

      const { data }: { data: { msg: string } } = await axios.delete('/api/edit/module', {
        params: {
          _id,
        },
      });

      console.log(data);

      dispatch({ type: DELETE_MODULE });

      saveLastUpdate();
      window.location.replace(`/home/modules`);
    } catch (err) {
      console.error(err);
    }

    dispatch(set_module_loading(false));
  });

// DELETE_CARD
export const delete_card = (_id: string) => <ThunkActionApp>(async (
    dispatch,
    getState
  ) => {
    try {
      const {
        auth: { user },
      } = getState();
      if (!user) return;

      const { data }: { data: { msg: string } } = await axios.delete('/api/edit/card', {
        params: {
          _id,
        },
      });

      console.log(data);

      dispatch({
        type: DELETE_CARD,
        payload: {
          _id,
        },
      });

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

// EDIT_MODULE
export const edit_module = () => <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        auth: { user },
        main: { module },
      } = getState();
      if (!user) return;

      const { data }: { data: { msg: string } } = await axios.put(
        '/api/edit/module',
        module
      );

      console.log(data);

      dispatch({ type: EDIT_MODULE });

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

// EDIT_CARD
export const edit_card = (_id: string) => <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        auth: { user },
        main: { cards },
      } = getState();
      if (!user) return;

      const { data }: { data: { msg: string } } = await axios.put(
        '/api/edit/card',
        cards[_id]
      );

      console.log(data);

      dispatch({ type: EDIT_CARD });

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }
  });

// CREATE_MODULE
export const create_module = () => <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        auth: { user },
        main: { cards, module },
      } = getState();

      const module_loading = module && module.module_loading;

      if (!user || module_loading) return;

      dispatch(set_module_loading(true));

      const _id_arr = [];

      const cards_arr = Object.values(cards);

      for (const card of cards_arr) {
        if (card.save) _id_arr.push(card._id);
      }

      console.log(_id_arr);

      const { data }: { data: { msg: string } } = await axios.post('/api/edit/module', {
        _id_arr,
      });

      console.log(data);

      dispatch({ type: CREATE_MODULE });

      saveLastUpdate();
    } catch (err) {
      console.error(err);
    }

    window.location.replace('/home/modules');
    dispatch(set_module_loading(false));
  });

// CREATE_CARD
export const create_card = () => <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        auth: { user },
        main: { module },
      } = getState();
      if (!user) return;

      const { data }: { data: CardBase } = await axios.post('/api/edit/card', {
        module,
      });

      const new_card: Card = {
        ...data,
        ...card_fields,
      };

      dispatch({ type: CREATE_CARD, payload: new_card });

      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );

      saveLastUpdate();

      window.scrollTo(0, scrollHeight);
    } catch (err) {
      console.error(err);
    }
  });

// =============================
// =============================
// ======== Suplemental ========
// =============================
// =============================

const arr_to_obj = (arr: ImgurlBase[]): ImgurlObjs => {
  return Object.fromEntries(
    arr.map((url, i) => [
      i,
      {
        ...url,
        ...url_fields,
      },
    ])
  );
};

const format_dictionary_result = (result: CodDictResult | UrbanDictResult): string => {
  const { type, data } = result;

  let devider = '<br><div>-------</div><br>';
  let br = '<br>';

  let formatedResult = devider;

  const wrap_in = (str?: string, el?: 'div'): string => {
    if (!str) return '';

    switch (el) {
      case 'div':
        return `<${el}>` + str + `</${el}>`;
      default:
        return `( ` + str + ` )`;
    }
  };

  // cod
  if (type === 'cod') {
    data.map((sect) => {
      let { part_of_speech, transcr_uk, transcr_us, sub_sections } = sect;

      sub_sections.map((sub_sect) => {
        let { guideword, blocks } = sub_sect;

        blocks.map((block) => {
          let { definition, examples } = block;

          let examplesHtml = '';
          examples.map((example) => {
            examplesHtml = examplesHtml + wrap_in(example, 'div');
          });

          let defenitionHtml = wrap_in(guideword.concat(wrap_in(definition)), 'div');

          let additionalInfoHtml = wrap_in(
            wrap_in(transcr_us).concat(wrap_in(part_of_speech), wrap_in()),
            'div'
          );

          formatedResult = formatedResult.concat(
            examplesHtml,
            br,
            defenitionHtml,
            additionalInfoHtml,
            devider
          );
        });
      });
    });

    // urban
  } else if (type === 'urban') {
    data.map((panel) => {
      let { definition, example } = panel;

      formatedResult = formatedResult.concat(
        wrap_in(example, 'div'),
        br,
        wrap_in(wrap_in(definition), 'div'),
        devider
      );
    });
  }

  return formatedResult;
};

interface CodSection {
  part_of_speech: string;
  sub_sections: {
    blocks: {
      definition: string;
      examples: string[];
    }[];
    guideword: string;
  }[];
  transcr_uk: string;
  transcr_us: string;
}

type CodReply = CodSection[];

interface CodDictResult {
  type: 'cod';
  data: CodReply;
}

interface UrbanPanel {
  definition: string;
  example: string;
}

type UrbanReply = UrbanPanel[];

interface UrbanDictResult {
  type: 'urban';
  data: UrbanReply;
}
