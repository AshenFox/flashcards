import { CaseReducer } from "@reduxjs/toolkit";
import { Action } from "@store/types";

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

export type VoiceState = {
  voices: Voices;
  speaking: Speaking;
  working: boolean;
};

export type VoiceCaseReducer<P = undefined> = CaseReducer<
  VoiceState,
  Action<P>
>;
