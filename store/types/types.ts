import {
  SelectBy,
  SelectCreated,
  Module,
  Card,
  Cards,
  ImgurlObjs,
} from './../reducers/main/mainInitState';
import { User } from './../reducers/auth/authInitState';
import {
  ModalType,
  ModalInputFileds,
  LogInErrors,
  SignUpErrors,
} from './../reducers/modal/modalInitState';
// modal
export const CHANGE_MODAL = 'CHANGE_MODAL';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const CONTROL_FIELD = 'CONTROL_FIELD';
export const CHANGE_MODAL_LOADING = 'CHANGE_MODAL_LOADING';
export const CLEAR_LOG_IN = 'CLEAR_LOG_IN';
export const CLEAR_SIGN_UP = 'CLEAR_SIGN_UP';
export const ENTER = 'ENTER';

export interface ChangeModalAction {
  type: typeof CHANGE_MODAL;
  payload: {
    active_modal: ModalType;
  };
}

export interface ToggleModalAction {
  type: typeof TOGGLE_MODAL;
  payload?: {};
}

export interface ControlFieldAction {
  type: typeof CONTROL_FIELD;
  payload: {
    field: ModalType;
    name: ModalInputFileds;
    value: string;
  };
}

export interface ChangeModalLoadingAction {
  type: typeof CHANGE_MODAL_LOADING;
  payload: boolean;
}

export interface ClearLogInAction {
  type: typeof CLEAR_LOG_IN;
  payload?: {};
}

export interface ClearSignUpAction {
  type: typeof CLEAR_SIGN_UP;
  payload?: {};
}

interface CkeckFieldActionPayload extends SignUpErrors {
  type: ModalInputFileds;
}

export interface CheckFieldAction {
  type: typeof CHECK_FIELD;
  payload: CkeckFieldActionPayload;
}

export interface EnterAction {
  type: typeof ENTER;
  payload: {
    log_in_errors?: LogInErrors;
    sign_up_errors?: SignUpErrors;
  };
}

export type ModalActions =
  | ChangeModalAction
  | ToggleModalAction
  | ControlFieldAction
  | ChangeModalLoadingAction
  | ClearLogInAction
  | ClearSignUpAction
  | CheckFieldAction
  | EnterAction;

// auth
export const CHECK_FIELD = 'CHECK_FIELD';
export const LOG_OUT = 'LOG_OUT';
export const AUTHENTICATE = 'AUTHENTICATE';
export const CHANGE_AUTH_LOADING = 'CHANGE_AUTH_LOADING';

export interface LogOutAction {
  type: typeof LOG_OUT;
  payload?: {};
}

export interface AuthenticateAction {
  type: typeof AUTHENTICATE;
  payload: User;
}

export interface ChangeAuthLoadingAction {
  type: typeof CHANGE_AUTH_LOADING;
  payload: boolean;
}

export type AuthActions = LogOutAction | AuthenticateAction | ChangeAuthLoadingAction;

// main
export const SET_IS_SERVER = 'SET_IS_SERVER';
export const SET_MAIN_LOADING = 'SET_MAIN_LOADING';
export const GET_MODULES = 'GET_MODULES';
export const GET_CARDS = 'GET_CARDS';
export const SET_SKIP_CARDS = 'SET_SKIP_CARDS';
export const SET_SKIP_MODULES = 'SET_SKIP_MODULES';
export const CONTROL_SEARCH_CARDS = 'CONTROL_SEARCH_CARDS';
export const CONTROL_SEARCH_MODULES = 'CONTROL_SEARCH_MODULES';
export const SET_SELECT_BY = 'SET_SELECT_BY';
export const SET_SELECT_CREATED = 'SET_SELECT_CREATED';
export const RESET_FIELDS_CARDS = 'RESET_FIELDS_CARDS';
export const RESET_FIELDS_MODULES = 'RESET_FIELDS_MODULES';
export const RESET_SEARCH = 'RESET_SEARCH';
export const GET_MODULE = 'GET_MODULE';
export const GET_MODULE_CARDS = 'GET_MODULE_CARDS';
export const CLEAR_MODULE = 'CLEAR_MODULE';
export const SET_SCROLL_TOP = 'SET_SCROLL_TOP';

export interface SetIsServerAction {
  type: typeof SET_IS_SERVER;
  payload: {
    value: boolean;
  };
}

export interface SetMainLoadingAction {
  type: typeof SET_MAIN_LOADING;
  payload: boolean;
}

export interface GetModulesAction {
  type: typeof GET_MODULES;
  payload: {
    all_modules: boolean;
    all_modules_number: number;
    draft: Module | false;
    modules: Module[];
    modules_number: number;
  };
}

export interface GetCardsAction {
  type: typeof GET_CARDS;
  payload: {
    all_cards: boolean;
    all_cards_number: number;
    cards: {
      [key: string]: Card;
    };
    cards_number: number;
  };
}

export interface SetSkipCardsAction {
  type: typeof SET_SKIP_CARDS;
  payload: number;
}

export interface SetSkipModulesAction {
  type: typeof SET_SKIP_MODULES;
  payload: number;
}

export interface ControlSearchCardsAction {
  type: typeof CONTROL_SEARCH_CARDS;
  payload: {
    value: string;
  };
}

export interface ControlSearchModulesAction {
  type: typeof CONTROL_SEARCH_MODULES;
  payload: {
    value: string;
  };
}

export interface SetSelectByAction {
  type: typeof SET_SELECT_BY;
  payload: SelectBy;
}

export interface SetSelectCreated {
  type: typeof SET_SELECT_CREATED;
  payload: SelectCreated;
}

export interface ResetFieldsCardsAction {
  type: typeof RESET_FIELDS_CARDS;
  payload?: {};
}

export interface ResetFieldsModulesAction {
  type: typeof RESET_FIELDS_MODULES;
  payload?: {};
}

export interface ResetSearchAction {
  type: typeof RESET_SEARCH;
  payload?: {};
}

export interface GetModuleAction {
  type: typeof GET_MODULE;
  payload: {
    cards: Cards;
    module: Module;
  };
}

export interface GetModuleCardsAction {
  type: typeof GET_MODULE_CARDS;
  payload: {
    cards: Cards;
  };
}

export interface ClearModuleAction {
  type: typeof CLEAR_MODULE;
  payload?: {};
}

export interface SetScrollTopAction {
  type: typeof SET_SCROLL_TOP;
  payload: {
    value: boolean;
  };
}

// header
export const SET_DROPDOWN = 'SET_DROPDOWN';

export interface SetDropdownAction {
  type: typeof SET_DROPDOWN;
  payload?: {};
}

// dimen
export const SET_HEADER_DIMEN = 'SET_HEADER_DIMEN';
export const SET_SCROLL_HEIGHT = 'SET_SCROLL_HEIGHT';
export const SET_SCROLL_WIDTH = 'SET_SCROLL_WIDTH';
export const SET_GAME_CONTROLS_DIMEN = 'SET_GAME_CONTROLS_DIMEN';
export const SET_IS_SCROLL = 'SET_IS_SCROLL';

export interface SetHeaderDimenAction {
  type: typeof SET_HEADER_DIMEN;
  payload: {
    header_height: number;
    header_width: number;
  };
}

export interface SetScrollHeightAction {
  type: typeof SET_SCROLL_HEIGHT;
  payload: {
    scroll_height: number;
  };
}

export interface SetScrollWidthAction {
  type: typeof SET_SCROLL_WIDTH;
  payload: {
    scroll_width: number;
  };
}

export interface SetGameControlsDimen {
  type: typeof SET_GAME_CONTROLS_DIMEN;
  payload: {
    game_controls_height: number;
    game_controls_width: number;
  };
}

export interface SetIsScrollAction {
  type: typeof SET_IS_SCROLL;
  payload: {
    is_scroll: boolean;
  };
}

export type DimenActions =
  | SetHeaderDimenAction
  | SetScrollHeightAction
  | SetScrollWidthAction
  | SetGameControlsDimen
  | SetIsScrollAction;

// edit
export const SET_CARD_EDIT = 'SET_CARD_EDIT';
export const SET_GALLERY_SEARCH = 'SET_GALLERY_SEARCH';
export const SET_URL_OK = 'SET_URL_OK';
export const CONTROL_CARD = 'CONTROL_CARD';
export const SET_CARD_IMGURL = 'SET_CARD_IMGURL';
export const CONTROL_MODULE = 'CONTROL_MODULE';
export const CONTROL_GALLERY_QUERY = 'CONTROL_GALLERY_QUERY';
export const SEARCH_IMAGES = 'SEARCH_IMAGES';
export const RESET_GALLERY_FIELDS = 'RESET_GALLERY_FIELDS';
export const SET_GALLERY_LOADING = 'SET_GALLERY_LOADING';
export const SET_GALLERY_WIDTH = 'SET_GALLERY_WIDTH';
export const MOVE_GALLERY = 'MOVE_GALLERY';
export const SCRAPE_DICTIONARY = 'SCRAPE_DICTIONARY';
export const SET_SCRAPE_LOADING = 'SET_SCRAPE_LOADING';
export const SET_GALLERY_ERROR = 'SET_GALLERY_ERROR';
export const DELETE_MODULE = 'DELETE_MODULE';
export const DELETE_CARD = 'DELETE_CARD';
export const EDIT_MODULE = 'EDIT_MODULE';
export const EDIT_CARD = 'EDIT_CARD';
export const CREATE_MODULE = 'CREATE_MODULE';
export const CREATE_CARD = 'CREATE_CARD';
export const SET_CARD_SAVE = 'SET_CARD_SAVE';
export const SET_CARDS_SAVE = 'SET_CARDS_SAVE';
export const SET_CARDS_SAVE_POSITIVE = 'SET_CARDS_SAVE_POSITIVE';
export const SET_MODULE_QUESTION = 'SET_MODULE_QUESTION';
export const SET_CARD_QUESTION = 'SET_CARD_QUESTION';
export const SET_MODULE_LOADING = 'SET_MODULE_LOADING';
export const SHUFFLE_FLASHCARDS = 'SHUFFLE_FLASHCARDS';
export const SORT_FLASHCARDS = 'SORT_FLASHCARDS';

export interface SetGalleryWidth {
  type: typeof SET_GALLERY_WIDTH;
  payload: {
    _id: string;
    width: number;
  };
}

export interface SetCardEditAction {
  type: typeof SET_CARD_EDIT;
  payload: {
    _id: string;
    value: boolean;
  };
}

export interface SetGallerySearchAction {
  type: typeof SET_GALLERY_SEARCH;
  payload: {
    _id: string;
    value: boolean;
  };
}

export interface SetUrlOkAction {
  type: typeof SET_URL_OK;
  payload: {
    _id: string;
    index: string;
    value: boolean;
    loaded: number;
    failed: number;
  };
}

export interface ControlCardAction {
  type: typeof CONTROL_CARD;
  payload: {
    _id: string;
    type: 'term' | 'defenition';
    value: string;
  };
}

export interface SetCardImgurlAction {
  type: typeof SET_CARD_IMGURL;
  payload: {
    _id: string;
    imgurl: string;
  };
}

export interface ControlModuleAction {
  type: typeof CONTROL_MODULE;
  payload: {
    value: string;
  };
}

export interface ControlGalleryQueryAction {
  type: typeof CONTROL_GALLERY_QUERY;
  payload: {
    _id: string;
    value: string;
  };
}

export interface SearchImagesAction {
  type: typeof SEARCH_IMAGES;
  payload: {
    _id: string;
    imgurl_obj: ImgurlObjs;
    all: number;
  };
}

export interface ResetGalleryFieldsAction {
  type: typeof RESET_GALLERY_FIELDS;
  payload: {
    _id: string;
  };
}

export interface SetGalleryLoadingAction {
  type: typeof SET_GALLERY_LOADING;
  payload: {
    _id: string;
    loading: boolean;
  };
}

export interface MoveGalleryAction {
  type: typeof MOVE_GALLERY;
  payload: {
    _id: string;
    offset: number;
  };
}

export interface ScrapeDictionaryAction {
  type: typeof SCRAPE_DICTIONARY;
  payload: {
    _id: string;
    result: string;
  };
}

export interface SetScrapeLoadingAction {
  type: typeof SET_SCRAPE_LOADING;
  payload: {
    _id: string;
    loading: boolean;
  };
}

export interface SetGalleryErrorAction {
  type: typeof SET_GALLERY_ERROR;
  payload: {
    _id: string;
    error: boolean;
  };
}

export interface DeleteModuleAction {
  type: typeof DELETE_MODULE;
  payload?: {};
}

export interface DeleteCardAction {
  type: typeof DELETE_CARD;
  payload: {
    _id: string;
  };
}

export interface EditModuleAction {
  type: typeof EDIT_MODULE;
  payload?: {};
}

export interface EditCardAction {
  type: typeof EDIT_CARD;
  payload?: {};
}

export interface CreateModuleAction {
  type: typeof CREATE_MODULE;
  payload?: {};
}

export interface CreateCardAction {
  type: typeof CREATE_CARD;
  payload: Card;
}

export interface SetCardSaveAction {
  type: typeof SET_CARD_SAVE;
  payload: {
    _id: string;
    value: boolean;
  };
}

export interface SetCardsSaveAction {
  type: typeof SET_CARDS_SAVE;
  payload: {
    value: boolean;
  };
}

export interface SetCardsSavePositiveAction {
  type: typeof SET_CARDS_SAVE_POSITIVE;
  payload: {
    _id_arr: string[];
  };
}

export interface SetModuleQuestionAction {
  type: typeof SET_MODULE_QUESTION;
  payload: {
    value: boolean;
  };
}

export interface SetCardQuestionAction {
  type: typeof SET_CARD_QUESTION;
  payload: {
    _id: string;
    value: boolean;
  };
}

export interface SetModuleLoadingAction {
  type: typeof SET_MODULE_LOADING;
  payload: {
    value: boolean;
  };
}

export interface ShuffleFlashcardsAction {
  type: typeof SHUFFLE_FLASHCARDS;
  payload?: {};
}

export interface SortFlashcardsAction {
  type: typeof SORT_FLASHCARDS;
  payload?: {};
}

export type MainActions =
  | SetIsServerAction
  | SetMainLoadingAction
  | GetModulesAction
  | GetCardsAction
  | SetSkipCardsAction
  | SetSkipModulesAction
  | ControlSearchCardsAction
  | ControlSearchModulesAction
  | SetSelectByAction
  | SetSelectCreated
  | ResetFieldsCardsAction
  | ResetFieldsModulesAction
  | ResetSearchAction
  | GetModuleAction
  | GetModuleCardsAction
  | ClearModuleAction
  | SetScrollTopAction
  | SetCardEditAction
  | SetGallerySearchAction
  | SetUrlOkAction
  | ControlCardAction
  | SetCardImgurlAction
  | ControlModuleAction
  | ControlGalleryQueryAction
  | SearchImagesAction
  | ResetGalleryFieldsAction
  | SetGalleryLoadingAction
  | MoveGalleryAction
  | ScrapeDictionaryAction
  | SetScrapeLoadingAction
  | SetGalleryErrorAction
  | DeleteModuleAction
  | DeleteCardAction
  | EditModuleAction
  | EditCardAction
  | CreateModuleAction
  | CreateCardAction
  | SetCardSaveAction
  | SetCardsSaveAction
  | SetCardsSavePositiveAction
  | SetModuleQuestionAction
  | SetCardQuestionAction
  | SetModuleLoadingAction
  | SetGalleryWidth
  | ShuffleFlashcardsAction
  | SortFlashcardsAction;

// voice
export const INIT_VOICE = 'INIT_VOICE';
export const SET_VOICE_SPEAKING = 'SET_VOICE_SPEAKING';

export interface InitVoiceAction {
  type: typeof INIT_VOICE;
  payload?: {};
}

export interface SetVoiceSpeakingAction {
  type: typeof SET_VOICE_SPEAKING;
  payload?: {};
}

export type VoiceActions = InitVoiceAction | SetVoiceSpeakingAction;

// game
export const RESET_ALL_GAME_FIELDS = 'RESET_ALL_GAME_FIELDS';

export interface ResetAllGameFieldsAction {
  type: typeof RESET_ALL_GAME_FIELDS;
  payload?: {};
}

export type GameActions = ResetAllGameFieldsAction;

// falshcards
export const SET_FLASHCARDS_PROGRESS = 'SET_FLASHCARDS_PROGRESS';
export const RESET_FLASHCARDS_PROGRESS = 'RESET_FLASHCARDS_PROGRESS';
export const SET_FLASHCARDS_SHUFFLED = 'SET_FLASHCARDS_SHUFFLED';
export const SET_FLASHCARDS_SIDE = 'SET_FLASHCARDS_SIDE';
export const SAVE_FLASHCARDS_ANSWER = 'SAVE_FLASHCARDS_ANSWER';

export interface SetFlashcardsProgressAction {
  type: typeof SET_FLASHCARDS_PROGRESS;
  payload?: {};
}

export interface ResetFlashcardsProgressAction {
  type: typeof RESET_FLASHCARDS_PROGRESS;
  payload?: {};
}

export interface SetFlashcardsShuffledAction {
  type: typeof SET_FLASHCARDS_SHUFFLED;
  payload?: {};
}

export interface SetFlashcardsSideAction {
  type: typeof SET_FLASHCARDS_SIDE;
  payload?: {};
}

export interface SaveFlashcardsAnswerAction {
  type: typeof SAVE_FLASHCARDS_ANSWER;
  payload?: {};
}

export type FlashcardsActions =
  | SetFlashcardsProgressAction
  | ResetFlashcardsProgressAction
  | SetFlashcardsShuffledAction
  | SetFlashcardsSideAction
  | SaveFlashcardsAnswerAction;

// write
export const PREPARE_WRITE = 'PREPARE_WRITE';
export const SET_WRITE_IS_INIT = 'SET_WRITE_IS_INIT';
export const SET_WRITE_ANSWER_FIELD = 'SET_WRITE_ANSWER_FIELD';
export const SET_WRITE_COPY_ANSWER_FIELD = 'SET_WRITE_COPY_ANSWER_FIELD';
export const CHECK_WRITE_ANSWER = 'CHECK_WRITE_ANSWER';
export const NEXT_WRITE_CARD = 'NEXT_WRITE_CARD';
export const OVERRIDE_WRITE_ANSWER = 'OVERRIDE_WRITE_ANSWER';
export const NEXT_WRITE_ROUND = 'NEXT_WRITE_ROUND';

export interface PrepareWriteAction {
  type: typeof PREPARE_WRITE;
  payload?: {};
}

export interface SetWriteIsInitAction {
  type: typeof SET_WRITE_IS_INIT;
  payload?: {};
}

export interface SetWriteAnswerFieldAction {
  type: typeof SET_WRITE_ANSWER_FIELD;
  payload?: {};
}

export interface SetWriteCopyAnswerFieldAction {
  type: typeof SET_WRITE_COPY_ANSWER_FIELD;
  payload?: {};
}

export interface CheckWriteAnswerAction {
  type: typeof CHECK_WRITE_ANSWER;
  payload?: {};
}

export interface NextWriteCardAction {
  type: typeof NEXT_WRITE_CARD;
  payload?: {};
}

export interface OverrideWriteAnswerAction {
  type: typeof OVERRIDE_WRITE_ANSWER;
  payload?: {};
}

export interface NextWriteRoundAction {
  type: typeof NEXT_WRITE_ROUND;
  payload?: {};
}

export type WriteActions =
  | PrepareWriteAction
  | SetWriteIsInitAction
  | SetWriteAnswerFieldAction
  | SetWriteCopyAnswerFieldAction
  | CheckWriteAnswerAction
  | NextWriteCardAction
  | OverrideWriteAnswerAction
  | NextWriteRoundAction;

// sr
export const GET_SR_COUNT = 'GET_SR_COUNT';
export const GET_SR_CARDS = 'GET_SR_CARDS';
export const SET_SR_COUNTER = 'SET_SR_COUNTER';
export const PUT_SR_ANSWER = 'PUT_SR_ANSWER';
export const SET_CARD_SR = 'SET_CARD_SR';
export const SET_SR_LOADING = 'SET_SR_LOADING';
export const SET_CARDS_SR = 'SET_CARDS_SR';
export const SET_CARDS_SR_POSITIVE = 'SET_CARDS_SR_POSITIVE';
export const DROP_CARD_SR = 'DROP_CARD_SR';
export const DROP_CARDS_SR = 'DROP_CARDS_SR';

export interface GetSRCountAction {
  type: typeof GET_SR_COUNT;
  payload?: {};
}

export interface GetSRCardsAction {
  type: typeof GET_SR_CARDS;
  payload?: {};
}

export interface SetSRCounterAction {
  type: typeof SET_SR_COUNTER;
  payload?: {};
}

export interface RutSRAnswerAction {
  type: typeof PUT_SR_ANSWER;
  payload?: {};
}

export interface SetCardSRAction {
  type: typeof SET_CARD_SR;
  payload?: {};
}

export interface SetSRLoadingAction {
  type: typeof SET_SR_LOADING;
  payload?: {};
}

export interface SetCardsSRAction {
  type: typeof SET_CARDS_SR;
  payload?: {};
}

export interface SetCardsSRPositiveAction {
  type: typeof SET_CARDS_SR_POSITIVE;
  payload?: {};
}

export interface DropCardSRAction {
  type: typeof DROP_CARD_SR;
  payload?: {};
}

export interface DropCardsSRAction {
  type: typeof DROP_CARDS_SR;
  payload?: {};
}

export type SrActions =
  | GetSRCountAction
  | GetSRCardsAction
  | SetSRCounterAction
  | RutSRAnswerAction
  | SetCardSRAction
  | SetSRLoadingAction
  | SetCardsSRAction
  | SetCardsSRPositiveAction
  | DropCardSRAction
  | DropCardsSRAction;

// ===========

export type AppActions =
  | AuthActions
  | ModalActions
  | MainActions
  | DimenActions
  | VoiceActions
  | GameActions
  | FlashcardsActions
  | WriteActions
  | SrActions;
