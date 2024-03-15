export type EasySpeechStatus = {
  status: string;
  initialized: boolean;
  speechSynthesis: SpeechSynthesis;
  speechSynthesisUtterance: SpeechSynthesisUtterance;
  speechSynthesisVoice: SpeechSynthesisVoice;
  speechSynthesisEvent: SpeechSynthesisEvent;
  speechSynthesisErrorEvent: SpeechSynthesisErrorEvent;
  voices: SpeechSynthesisVoice[];
  defaults: {
    pitch: number;
    rate: number;
    volume: number;
    voice: SpeechSynthesisVoice | null;
  };
  handlers: any;
};

export type Voices = {
  rusBackup?: SpeechSynthesisVoice;
  engBackup?: SpeechSynthesisVoice;
  english?: SpeechSynthesisVoice;
  russian?: SpeechSynthesisVoice;
};

export type Speaking =
  | {
      _id: string;
      type: 'term' | 'definition';
    }
  | false;

export interface VoiceState {
  voices: Voices;
  speaking: Speaking;
  working: boolean;
}

const voiceInitState: VoiceState = {
  voices: {},
  speaking: false,
  working: false,
};

export default voiceInitState;
