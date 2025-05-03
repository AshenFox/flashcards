import { useActions, useAppSelector } from "@store/hooks";
import { EasySpeechStatus, VoiceData } from "@store/reducers/voice/types";
import { SpeakerIcon } from "@ui/Icons";
import Tooltip from "@ui/Tooltip";
import clsx from "clsx";
import EasySpeech from "easy-speech";
import { ForwardedRef, memo, useCallback, useMemo } from "react";

import s from "./styles.module.scss";

type SpeakerProps = {
  _id: string;
  text: string;
  type: "term" | "definition";
  className: string;
  ref?: ForwardedRef<HTMLDivElement>;
};

const Speaker = ({ _id, text, type, className, ref }: SpeakerProps) => {
  const { setVoiceSpeaking } = useActions();

  const { voices, working, speaking } = useAppSelector(({ voice }) => voice);

  const filteredText = useMemo(() => filterText(text), [text]);
  const language = useMemo(() => detectLanguage(filteredText), [filteredText]);
  const active = text !== "" && language && working;

  let speakerSpeaking = false;

  if (speaking)
    speakerSpeaking = speaking._id === _id && speaking.type === type;

  const cancel = useCallback(() => EasySpeech.cancel(), []);

  const speak = useCallback(
    async (text: string, language: "english" | "russian") => {
      let voiceData: VoiceData | undefined;
      let voice: SpeechSynthesisVoice | undefined;

      if (language === "english") {
        voiceData = voices.english || voices.engBackup;
      } else if (language === "russian") {
        voiceData = voices.russian || voices.rusBackup;
      }

      if (!voiceData) return;

      // Get the actual SpeechSynthesisVoice object
      const availableVoices = EasySpeech.voices();
      voice = availableVoices.find(v => v.voiceURI === voiceData?.voiceURI);

      if (!voice) return;

      await EasySpeech.speak({
        text,
        voice,
        pitch: 1,
        rate: 1,
        volume: 1,
        start: () => {
          console.info("Start speaking...");
          setVoiceSpeaking({ _id, type });
        },
        pause: e => {
          console.info("Pause");
        },
        end: () => {
          console.info("Done speaking...");
          setVoiceSpeaking();
        },
        error: e => {
          console.info("Interrupted or something vent wrong...", e);
          setVoiceSpeaking();
        },
      });
    },
    [
      _id,
      type,
      setVoiceSpeaking,
      voices.engBackup,
      voices.english,
      voices.rusBackup,
      voices.russian,
    ],
  );

  const clickSpeaker = useCallback(() => {
    if (!active) return;

    const status = EasySpeech.status() as EasySpeechStatus;

    if (status.speechSynthesis.speaking) {
      cancel();
      setVoiceSpeaking();
    } else {
      const textForSpeaking = filterLang(filteredText, language);
      speak(textForSpeaking, language);
    }
  }, [active, filteredText, language, setVoiceSpeaking, speak, cancel]);

  const id = `speaker-${_id}-${type}`;

  return (
    <>
      <div
        className={clsx(s.speaker, className, {
          [s.disabled]: !active,
          [s.speaking]: speakerSpeaking,
        })}
        onClick={clickSpeaker}
        ref={ref}
        data-tooltip-id={id}
      >
        <SpeakerIcon />
      </div>
      {active && (
        <Tooltip id={id}>
          {speaking ? "Stop speaking" : "Speak " + type}
        </Tooltip>
      )}
    </>
  );
};

export default memo(Speaker);

// Supplemental functions
// ==============================
// ==============================
// ==============================

const detectLanguage = (text: string) => {
  if (text !== "" && text) {
    let arrRus = text.match(/[а-яА-ЯЁё]/g);
    let arrEng = text.match(/[a-zA-Z]/g);

    if (!arrRus && !arrEng) return false;

    let lengthRus = arrRus ? arrRus.length : 0;
    let lengthEng = arrEng ? arrEng.length : 0;

    let lengthTotal = lengthRus + lengthEng;
    return lengthEng / lengthTotal > 0.5 ? "english" : "russian";
  } else {
    return false;
  }
};

const filterLang = (text: string, lang: "english" | "russian") => {
  let filtered = text;
  if (lang === "english") {
    filtered = filtered.replace(/[а-яА-ЯЁё]/g, "");
  } else if (lang === "russian") {
    filtered = filtered.replace(/[a-zA-Z]/g, "");
  }

  return filtered;
};

const filterText = (text: string) =>
  text
    .replace(/<[^>]*>/g, " ")
    .replace(/\( \/[^/]*\/ \)/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\.\.\./g, ". ");
