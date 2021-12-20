import {
  SET_CARD_EDIT,
  CONTROL_CARD,
  CONTROL_MODULE,
  SET_GALLERY_SEARCH,
  CONTROL_GALLERY_QUERY,
  SEARCH_IMGAGES,
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
} from './types';
import { url_fields } from '../reducers/main/mainInitState';
import { card_fields } from '../reducers/main/mainInitState';
import axios from '../../server/supplemental/axios';

// SET_CARDS_SAVE_POSITIVE
export const set_cards_save_positive = (_id) => async (dispatch, getState) => {
  const {
    main: { cards },
  } = getState();

  const cards_arr = Object.values(cards);
  let _id_arr = [];

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
};

// SET_CARDS_SAVE
export const set_cards_save = (value) => ({
  type: SET_CARDS_SAVE,
  payload: {
    value,
  },
});

// SET_CARD_SAVE
export const set_card_save = (_id, value) => ({
  type: SET_CARD_SAVE,
  payload: {
    _id,
    value,
  },
});

// SET_MODULE_LOADING
export const set_module_loading = (value) => ({
  type: SET_MODULE_LOADING,
  payload: {
    value,
  },
});

// SET_MODULE_QUESTION
export const set_module_question = (value) => ({
  type: SET_MODULE_QUESTION,
  payload: {
    value,
  },
});

// SET_CARD_QUESTION
export const set_card_question = (_id, value) => ({
  type: SET_CARD_QUESTION,
  payload: {
    _id,
    value,
  },
});

// SET_GALLERY_ERROR
export const set_gallery_error = (_id, value) => ({
  type: SET_GALLERY_ERROR,
  payload: {
    _id,
    error: value,
  },
});

// SCRAPE_DICTIONARY
export const scrape_dictionary = (_id, value) => async (dispatch, getState) => {
  try {
    const {
      main: { cards },
    } = getState();

    const { term } = cards[_id];

    if (!term) throw new Error('Term field can not be empty.');

    dispatch(set_scrape_loading(_id, true));

    const term_without_tags = term.replace(/<[^>]*>/g, '');

    let query;

    if (value === 'cod') query = term_without_tags.replace(/\s+/g, '-');
    if (value === 'urban') query = term_without_tags.replace(/\s+/g, '+');

    const { data } = await axios.get(`/api/scrape/${value}`, {
      params: {
        query,
      },
    });

    const result = format_dictionary_result(data, value);

    dispatch({
      type: SCRAPE_DICTIONARY,
      payload: {
        _id,
        result,
      },
    });
  } catch (err) {
    console.error(err);
  }

  dispatch(set_scrape_loading(_id, false));
  dispatch(edit_card(_id));
};

// SET_CARD_IMGURL
export const set_card_imgurl = (_id, value) => ({
  type: SET_CARD_IMGURL,
  payload: {
    _id,
    imgurl: value,
  },
});

// SET_GALLERY_WIDTH
export const set_gallery_width = (_id, value) => {
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
export const move_gallery = (_id, value) => {
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
export const set_gallery_loading = (_id, value) => ({
  type: SET_GALLERY_LOADING,
  payload: {
    _id,
    loading: value,
  },
});

// SET_SCRAPE_LOADING
export const set_scrape_loading = (_id, value) => ({
  type: SET_SCRAPE_LOADING,
  payload: {
    _id,
    loading: value,
  },
});

// RESET_GALLERY_FIELDS
export const reset_gallery_fields = (_id) => ({
  type: RESET_GALLERY_FIELDS,
  payload: {
    _id,
  },
});

// SET_URL_OK
export const set_url_ok = (_id, index, value) => async (dispatch, getState) => {
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
};

// SET_CARD_EDIT
export const set_card_edit = (_id, value) => ({
  type: SET_CARD_EDIT,
  payload: {
    _id,
    value,
  },
});

// SET_GALLERY_SEARCH
export const set_gallery_search = (_id, value) => ({
  type: SET_GALLERY_SEARCH,
  payload: {
    _id,
    value,
  },
});

// CONTROL_CARD
export const control_card = (_id, type, value) => ({
  type: CONTROL_CARD,
  payload: {
    _id,
    type,
    value,
  },
});

// CONTROL_MODULE
export const control_module = (value) => ({
  type: CONTROL_MODULE,
  payload: {
    value,
  },
});

// CONTROL_GALLERY_QUERY
export const control_gallery_query = (_id, value) => ({
  type: CONTROL_GALLERY_QUERY,
  payload: {
    _id,
    value,
  },
});

// SEARCH_IMGAGES
export const search_images = (_id) => async (dispatch, getState) => {
  try {
    const {
      main: { cards },
    } = getState();

    const query = cards[_id].gallery.query;

    if (!query) throw new Error('Query can not be empty.');

    dispatch(set_gallery_loading(_id, true));

    let { data } = await axios.get('/api/imgsearch', {
      params: {
        query,
      },
    });

    const all = data.length;
    const imgurl_obj = arr_to_obj(data);

    dispatch({
      type: SEARCH_IMGAGES,
      payload: {
        _id,
        imgurl_obj,
        all,
      },
    });

    dispatch(set_gallery_loading(_id, false));
  } catch (err) {
    console.error(err);
    dispatch(set_gallery_error(_id, true));
  }

  dispatch(set_gallery_loading(_id, false));
};

const arr_to_obj = (arr) => {
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

// DELETE_MODULE

export const delete_module = (_id) => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
      main: {
        module: { module_loading },
      },
    } = getState();
    if (!user || module_loading) return;
    dispatch(set_module_loading(true));

    const { data } = await axios.delete('/api/edit/module', {
      params: {
        _id,
      },
    });

    console.log(data);

    dispatch({ type: DELETE_MODULE });
    window.location.replace(`/home/modules`);
  } catch (err) {
    console.error(err);
  }

  dispatch(set_module_loading(false));
};

// DELETE_CARD
export const delete_card = (_id) => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
    } = getState();
    if (!user) return;

    const { data } = await axios.delete('/api/edit/card', {
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
  } catch (err) {
    console.error(err);
  }
};

// EDIT_MODULE
export const edit_module = () => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
      main: { module },
    } = getState();
    if (!user) return;

    const { data } = await axios.put('/api/edit/module', module);

    console.log(data);

    dispatch({ type: EDIT_MODULE });
  } catch (err) {
    console.error(err);
  }
};

// EDIT_CARD
export const edit_card = (_id) => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
      main: { cards },
    } = getState();
    if (!user) return;

    const { data } = await axios.put('/api/edit/card', cards[_id]);

    console.log(data);

    dispatch({ type: EDIT_CARD });
  } catch (err) {
    console.error(err);
  }
};

// CREATE_MODULE
export const create_module = () => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
      main: {
        cards,
        module: { module_loading },
      },
    } = getState();
    if (!user || module_loading) return;

    dispatch(set_module_loading(true));

    const _id_arr = [];

    const cards_arr = Object.values(cards);

    for (const card of cards_arr) {
      if (card.save) _id_arr.push(card._id);
    }

    console.log(_id_arr);

    const { data } = await axios.post('/api/edit/module', {
      _id_arr,
    });

    console.log(data);

    dispatch({ type: CREATE_MODULE });
  } catch (err) {
    console.error(err);
  }

  window.location.replace('/home/modules');
  dispatch(set_module_loading(false));
};

// CREATE_CARD
export const create_card = () => async (dispatch, getState) => {
  try {
    const {
      auth: { user },
      main: { module },
    } = getState();
    if (!user) return;

    const { data } = await axios.post('/api/edit/card', {
      module,
    });

    const new_card = {
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

    window.scrollTo(0, scrollHeight);
  } catch (err) {
    console.error(err);
  }
};

// =============================
// =============================
// ======== Suplemental ========
// =============================
// =============================

const format_dictionary_result = (result, type) => {
  let devider = '<br><div>-------</div><br>';
  let br = '<br>';

  let formatedResult = devider;

  const wrap_in = (str, el) => {
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
    result.map((sect) => {
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
    let term;
    result.map((panel) => {
      let { definition, example } = panel;

      if (!term) {
        term = panel.term;
        formatedResult = formatedResult.concat(br, wrap_in(term, 'div'), br);
      }

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
