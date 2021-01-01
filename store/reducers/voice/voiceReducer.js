import { INIT_VOICE, SET_VOICE_SPEAKING } from '../../actions/types';
import initialState from './voiceInitState';

const VoiceReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case INIT_VOICE:
      return {
        ...state,
        working: payload.working,
        voices: payload.voices,
      };

    case SET_VOICE_SPEAKING:
      return {
        ...state,
        speaking: payload,
      };
    default:
      return state;
  }
};

export default VoiceReducer;
