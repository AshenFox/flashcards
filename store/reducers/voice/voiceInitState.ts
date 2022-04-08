export interface Voice {}

export interface VoiceState {
  voices: {
    rusBackup?: Voice;
    engBackup?: Voice;
    english?: Voice;
    russian?: Voice;
  }; // ?????
  speaking: boolean;
  working: boolean;
}

const voiceInitState: VoiceState = {
  voices: {},
  speaking: false,
  working: false,
};

export default voiceInitState;
