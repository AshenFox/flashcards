import * as editThunks from "./editThunks";
import * as mainThunks from "./mainThunks";
import * as srThunks from "./srThunks";

const thunks = {
  ...editThunks,
  ...mainThunks,
  ...srThunks,
};

export default thunks;
