export type VoiceData = {
  voiceURI: string;
  name: string;
  lang: string;
  localService: boolean;
  default: boolean;
};

export type Voices = {
  english?: VoiceData;
  russian?: VoiceData;
  engBackup?: VoiceData;
  rusBackup?: VoiceData;
};

export type Speaking =
  | {
      _id: string;
      type: "term" | "definition";
    }
  | false;

export type VoiceStore = {
  voices: Voices;
  speaking: Speaking;
  working: boolean;
  setVoicesAndWorking: (payload: { voices: Voices; working: boolean }) => void;
  setVoiceSpeaking: (payload?: { _id: string; type: "term" | "definition" }) => void;
};
