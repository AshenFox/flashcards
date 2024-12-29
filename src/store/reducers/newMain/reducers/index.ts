import * as editReducers from "./editReducers";
import * as flashcardsReducers from "./flashcardsReducers";
import * as galleryReducers from "./galleryReducers";
import * as mainReducers from "./mainReducers";
import * as scrapeReducers from "./scrapeReducers";
import * as srReducers from "./srReducers";

const reducers = {
  ...editReducers,
  ...flashcardsReducers,
  ...galleryReducers,
  ...mainReducers,
  ...scrapeReducers,
  ...srReducers,
};

export default reducers;
