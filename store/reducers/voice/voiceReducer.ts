import { VoiceActions } from './../../types/types';
import { INIT_EASY_SPEECH, SET_VOICE_SPEAKING } from '../../types/types';
import initialState, { VoiceState } from './voiceInitState';

const VoiceReducer = (state = initialState, action: VoiceActions): VoiceState => {
  const { payload, type } = action;

  switch (type) {
    case INIT_EASY_SPEECH:
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
