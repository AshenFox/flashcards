import { User } from "../reducers/auth/authInitState";
import { Round } from "../reducers/game/gameInitState";
import {
  Card,
  Cards,
  ImgurlObjs,
  Module,
  SelectBy,
  SelectCreated,
} from "../reducers/main/mainInitState";
import {
  LogInErrors,
  ModalInputFileds,
  ModalType,
  SignUpErrors,
} from "../reducers/modal/modalInitState";
import { Speaking, Voices } from "../reducers/voice/voiceInitState";
// modal
export const CHANGE_MODAL = "CHANGE_MODAL";
export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const CONTROL_FIELD = "CONTROL_FIELD";
export const CHANGE_MODAL_LOADING = "CHANGE_MODAL_LOADING";
export const CLEAR_LOG_IN = "CLEAR_LOG_IN";
export const CLEAR_SIGN_UP = "CLEAR_SIGN_UP";
export const ENTER = "ENTER";

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
export const CHECK_FIELD = "CHECK_FIELD";
export const LOG_OUT = "LOG_OUT";
export const AUTHENTICATE = "AUTHENTICATE";
export const CHANGE_AUTH_LOADING = "CHANGE_AUTH_LOADING";

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

export type AuthActions =
  | LogOutAction
  | AuthenticateAction
  | ChangeAuthLoadingAction;

// main
export const SET_IS_SERVER = "SET_IS_SERVER";
export const SET_MAIN_LOADING = "SET_MAIN_LOADING";
export const GET_MODULES = "GET_MODULES";
export const GET_CARDS = "GET_CARDS";
export const SET_SKIP_CARDS = "SET_SKIP_CARDS";
export const SET_SKIP_MODULES = "SET_SKIP_MODULES";
export const CONTROL_SEARCH_CARDS = "CONTROL_SEARCH_CARDS";
export const CONTROL_SEARCH_MODULES = "CONTROL_SEARCH_MODULES";
export const SET_SELECT_BY = "SET_SELECT_BY";
export const SET_SELECT_CREATED = "SET_SELECT_CREATED";
export const RESET_FIELDS_CARDS = "RESET_FIELDS_CARDS";
export const RESET_FIELDS_MODULES = "RESET_FIELDS_MODULES";
export const RESET_SEARCH = "RESET_SEARCH";
export const GET_MODULE = "GET_MODULE";
export const GET_MODULE_CARDS = "GET_MODULE_CARDS";
export const CLEAR_MODULE = "CLEAR_MODULE";
export const SET_SCROLL_TOP = "SET_SCROLL_TOP";

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
export const SET_DROPDOWN = "SET_DROPDOWN";

export interface SetDropdownAction {
  type: typeof SET_DROPDOWN;
  payload: boolean;
}

export type HeaderActions = SetDropdownAction;

// dimen
export const SET_HEADER_DIMEN = "SET_HEADER_DIMEN";

export interface SetHeaderDimenAction {
  type: typeof SET_HEADER_DIMEN;
  payload: {
    header_height: number;
    header_width: number;
  };
}

export type DimenActions = SetHeaderDimenAction;

// edit
export const DELETE_MODULE = "DELETE_MODULE"; // edit
export const EDIT_MODULE = "EDIT_MODULE"; // edit
export const EDIT_CARD = "EDIT_CARD"; // edit
export const CREATE_MODULE = "CREATE_MODULE"; // edit
export const SCRAPE_DICTIONARY = "SCRAPE_DICTIONARY"; // scrape
export const SET_SCRAPE_LOADING = "SET_SCRAPE_LOADING"; // scrape
export const SET_GALLERY_SEARCH = "SET_GALLERY_SEARCH"; // gallery
export const SET_URL_OK = "SET_URL_OK"; // gallery
export const CONTROL_GALLERY_QUERY = "CONTROL_GALLERY_QUERY"; // gallery
export const SEARCH_IMAGES = "SEARCH_IMAGES"; // gallery
export const RESET_GALLERY_FIELDS = "RESET_GALLERY_FIELDS"; // gallery
export const SET_GALLERY_LOADING = "SET_GALLERY_LOADING"; // gallery
export const SET_GALLERY_WIDTH = "SET_GALLERY_WIDTH"; // gallery
export const MOVE_GALLERY = "MOVE_GALLERY"; // gallery
export const SET_GALLERY_ERROR = "SET_GALLERY_ERROR"; // gallery
export const SHUFFLE_FLASHCARDS = "SHUFFLE_FLASHCARDS"; // flashcards
export const SORT_FLASHCARDS = "SORT_FLASHCARDS"; // flashcards
export const SET_CARD_EDIT = "SET_CARD_EDIT"; // edit
export const CONTROL_CARD = "CONTROL_CARD"; // edit
export const SET_CARD_IMGURL = "SET_CARD_IMGURL"; // edit
export const CONTROL_MODULE = "CONTROL_MODULE"; // edit
export const DELETE_CARD = "DELETE_CARD"; // edit
export const CREATE_CARD = "CREATE_CARD"; // edit
export const SET_CARD_SAVE = "SET_CARD_SAVE"; // edit
export const SET_CARDS_SAVE = "SET_CARDS_SAVE"; // edit
export const SET_CARDS_SAVE_POSITIVE = "SET_CARDS_SAVE_POSITIVE"; // edit
export const SET_MODULE_QUESTION = "SET_MODULE_QUESTION"; // edit
export const SET_CARD_QUESTION = "SET_CARD_QUESTION"; // edit
export const SET_MODULE_LOADING = "SET_MODULE_LOADING"; // edit

export type SubMainActions =
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
  | SetScrollTopAction;

export type SubGalleryActions =
  | SetGallerySearchAction
  | SetUrlOkAction
  | ControlGalleryQueryAction
  | SearchImagesAction
  | ResetGalleryFieldsAction
  | SetGalleryLoadingAction
  | MoveGalleryAction
  | SetGalleryErrorAction
  | SetGalleryWidth;

export type SubScrapeActions = ScrapeDictionaryAction | SetScrapeLoadingAction;

export type SubFlashcardsActions =
  | ShuffleFlashcardsAction
  | SortFlashcardsAction;

export type SubEditActions =
  | DeleteModuleAction
  | EditModuleAction
  | EditCardAction
  | CreateModuleAction
  | SetCardEditAction
  | ControlCardAction
  | SetCardImgurlAction
  | ControlModuleAction
  | DeleteCardAction
  | CreateCardAction
  | SetCardSaveAction
  | SetCardsSaveAction
  | SetCardsSavePositiveAction
  | SetModuleQuestionAction
  | SetCardQuestionAction
  | SetModuleLoadingAction;

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
    type: "term" | "defenition";
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

// voice
export const INIT_EASY_SPEECH = "INIT_EASY_SPEECH";
export const SET_VOICE_SPEAKING = "SET_VOICE_SPEAKING";

export interface InitEasySpeechAction {
  type: typeof INIT_EASY_SPEECH;
  payload: {
    voices: Voices;
    working: boolean;
  };
}

export interface SetVoiceSpeakingAction {
  type: typeof SET_VOICE_SPEAKING;
  payload: Speaking;
}

export type VoiceActions = InitEasySpeechAction | SetVoiceSpeakingAction;

// falshcards
export const SET_FLASHCARDS_PROGRESS = "SET_FLASHCARDS_PROGRESS";
export const RESET_FLASHCARDS_PROGRESS = "RESET_FLASHCARDS_PROGRESS";
export const SET_FLASHCARDS_SHUFFLED = "SET_FLASHCARDS_SHUFFLED";
export const SET_FLASHCARDS_SIDE = "SET_FLASHCARDS_SIDE";
export const SAVE_FLASHCARDS_ANSWER = "SAVE_FLASHCARDS_ANSWER";

export interface SetFlashcardsProgressAction {
  type: typeof SET_FLASHCARDS_PROGRESS;
  payload: {
    value?: number;
  };
}

export interface ResetFlashcardsProgressAction {
  type: typeof RESET_FLASHCARDS_PROGRESS;
  payload?: {};
}

export interface SetFlashcardsShuffledAction {
  type: typeof SET_FLASHCARDS_SHUFFLED;
  payload: {
    value: boolean;
  };
}

export interface SetFlashcardsSideAction {
  type: typeof SET_FLASHCARDS_SIDE;
  payload: {
    value: "definition" | "term";
  };
}

export interface SaveFlashcardsAnswerAction {
  type: typeof SAVE_FLASHCARDS_ANSWER;
  payload: {
    id: string;
    card_answer: "correct" | "incorrect";
  };
}

export type FlashcardsActions =
  | SetFlashcardsProgressAction
  | ResetFlashcardsProgressAction
  | SetFlashcardsShuffledAction
  | SetFlashcardsSideAction
  | SaveFlashcardsAnswerAction;

// write
export const PREPARE_WRITE = "PREPARE_WRITE";
export const SET_WRITE_IS_INIT = "SET_WRITE_IS_INIT";
export const SET_WRITE_ANSWER_FIELD = "SET_WRITE_ANSWER_FIELD";
export const SET_WRITE_COPY_ANSWER_FIELD = "SET_WRITE_COPY_ANSWER_FIELD";
export const CHECK_WRITE_ANSWER = "CHECK_WRITE_ANSWER";
export const NEXT_WRITE_CARD = "NEXT_WRITE_CARD";
export const OVERRIDE_WRITE_ANSWER = "OVERRIDE_WRITE_ANSWER";
export const NEXT_WRITE_ROUND = "NEXT_WRITE_ROUND";

export interface PrepareWriteAction {
  type: typeof PREPARE_WRITE;
  payload: {
    remaining: Round;
  };
}

export interface SetWriteIsInitAction {
  type: typeof SET_WRITE_IS_INIT;
  payload: {
    value: boolean;
  };
}

export interface SetWriteAnswerFieldAction {
  type: typeof SET_WRITE_ANSWER_FIELD;
  payload: {
    value: string;
  };
}

export interface SetWriteCopyAnswerFieldAction {
  type: typeof SET_WRITE_COPY_ANSWER_FIELD;
  payload: {
    value: string;
  };
}

export interface CheckWriteAnswerAction {
  type: typeof CHECK_WRITE_ANSWER;
  payload: {
    card_answer: "correct" | "incorrect";
    answer: string;
  };
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

// game
export const RESET_ALL_GAME_FIELDS = "RESET_ALL_GAME_FIELDS";

export interface ResetAllGameFieldsAction {
  type: typeof RESET_ALL_GAME_FIELDS;
  payload?: {};
}

export type GameActions =
  | ResetAllGameFieldsAction
  | WriteActions
  | FlashcardsActions;

// sr
export const GET_SR_COUNT = "GET_SR_COUNT";
export const SET_SR_COUNTER = "SET_SR_COUNTER";
export const SET_SR_LOADING = "SET_SR_LOADING";
export const GET_SR_CARDS = "GET_SR_CARDS";
export const PUT_SR_ANSWER = "PUT_SR_ANSWER";
export const SET_CARD_SR = "SET_CARD_SR";
export const SET_CARDS_SR = "SET_CARDS_SR";
export const SET_CARDS_SR_POSITIVE = "SET_CARDS_SR_POSITIVE";
export const DROP_CARD_SR = "DROP_CARD_SR";
export const DROP_CARDS_SR = "DROP_CARDS_SR";

export interface GetSRCountAction {
  type: typeof GET_SR_COUNT;
  payload: {
    all_num: number;
    repeat_num: number;
    next_num: number;
    next_date: string;
  };
}

export interface GetSRCardsAction {
  type: typeof GET_SR_CARDS;
  payload: {
    cards: Cards;
  };
}

export interface SetSRCounterAction {
  type: typeof SET_SR_COUNTER;
  payload: {
    value: number;
  };
}

export interface PutSRAnswerAction {
  type: typeof PUT_SR_ANSWER;
  payload: {
    _id: string;
    stage: number;
    nextRep: string;
    prevStage: string;
    lastRep: string;
    studyRegime: boolean;
  };
}

export interface SetCardSRAction {
  type: typeof SET_CARD_SR;
  payload: {
    _id: string;
    value: boolean;
  };
}

export interface SetSRLoadingAction {
  type: typeof SET_SR_LOADING;
  payload: {
    value: boolean;
  };
}

export interface SetCardsSRAction {
  type: typeof SET_CARDS_SR;
  payload: {
    value: boolean;
  };
}

export interface SetCardsSRPositiveAction {
  type: typeof SET_CARDS_SR_POSITIVE;
  payload: {
    _id_arr: string[];
  };
}

export interface DropCardSRAction {
  type: typeof DROP_CARD_SR;
  payload: {
    _id: string;
    stage: number;
    nextRep: string;
    prevStage: string;
    lastRep: string;
  };
}

export interface DropCardsSRAction {
  type: typeof DROP_CARDS_SR;
  payload: {
    stage: number;
    nextRep: string;
    prevStage: string;
    lastRep: string;
  };
}

export type SrActions =
  | GetSRCountAction
  | SetSRCounterAction
  | SetSRLoadingAction;

export type SubSrActions =
  | GetSRCardsAction
  | PutSRAnswerAction
  | SetCardSRAction
  | SetCardsSRAction
  | SetCardsSRPositiveAction
  | DropCardSRAction
  | DropCardsSRAction;

export type MainActions =
  | SubMainActions
  | SubEditActions
  | SubFlashcardsActions
  | SubGalleryActions
  | SubScrapeActions
  | SubSrActions;

// ===========

export type AppActions =
  | AuthActions
  | ModalActions
  | MainActions
  | DimenActions
  | VoiceActions
  | GameActions
  | SrActions
  | HeaderActions;
