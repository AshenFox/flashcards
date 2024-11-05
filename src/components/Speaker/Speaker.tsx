import { useActions, useAppSelector } from "@store/hooks";
import { EasySpeechStatus } from "@store/reducers/voice/voiceInitState";
import { SpeakerIcon } from "@ui/Icons";
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
  const { set_voice_speaking } = useActions();

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
      let voice: SpeechSynthesisVoice;

      if (language === "english") {
        if (voices.english) {
          voice = voices.english;
        } else if (voices.engBackup) {
          voice = voices.engBackup;
        } else {
          return;
        }
      } else if (language === "russian") {
        if (voices.russian) {
          voice = voices.russian;
        } else if (voices.rusBackup) {
          voice = voices.rusBackup;
        } else {
          return;
        }
      }

      await EasySpeech.speak({
        text,
        voice,
        pitch: 1,
        rate: 1,
        volume: 1,
        start: () => {
          console.info("Start speaking...");
          set_voice_speaking(_id, type);
        },
        pause: e => {
          console.info("Pause");
        },
        end: () => {
          console.info("Done speaking...");
          set_voice_speaking();
        },
        error: e => {
          console.info("Interrupted or something vent wrong...", e);
          set_voice_speaking();
        },
      });
    },
    [
      _id,
      type,
      set_voice_speaking,
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
      set_voice_speaking();
    } else {
      const textForSpeaking = filterLang(filteredText, language);
      speak(textForSpeaking, language);
    }
  }, [active, filteredText, language, set_voice_speaking, speak, cancel]);

  return (
    <div
      className={clsx(s.speaker, className)}
      data-active={active}
      data-speaking={speakerSpeaking}
      onClick={clickSpeaker}
      ref={ref}
    >
      <SpeakerIcon />
    </div>
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
