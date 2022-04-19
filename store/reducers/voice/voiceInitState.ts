export interface Voices {
  rusBackup?: SpeechSynthesisVoice;
  engBackup?: SpeechSynthesisVoice;
  english?: SpeechSynthesisVoice;
  russian?: SpeechSynthesisVoice;
}

export type Speaking =
  | {
      _id: string;
      type: 'term' | 'definition';
    }
  | false;

export interface VoiceState {
  voices: Voices; // ?????
  speaking: Speaking;
  working: boolean;
}

const voiceInitState: VoiceState = {
  voices: {},
  speaking: false,
  working: false,
};

export default voiceInitState;
