import { FC, forwardRef, useCallback, useMemo } from 'react';
import { useActions, useAppSelector } from '../../store/hooks';
import EasySpeech from 'easy-speech';
import { EasySpeechStatus } from '../../store/reducers/voice/voiceInitState';

interface OwnProps {
  _id: string;
  text: string;
  type: 'term' | 'definition';
  className: string;
}

type Props = OwnProps;

const Speaker: FC<Props> = forwardRef<HTMLDivElement, OwnProps>(
  ({ _id, text, type, className }, ref) => {
    const { set_voice_speaking } = useActions();

    const { voices, working, speaking } = useAppSelector(({ voice }) => voice);

    const filteredText = useMemo(() => filterText(text), [text]);
    const language = useMemo(() => detectLanguage(filteredText), [filteredText]);
    const active = text !== '' && language && working;

    let speakerSpeaking = false;

    if (speaking) speakerSpeaking = speaking._id === _id && speaking.type === type;

    const cancel = useCallback(() => EasySpeech.cancel(), []);

    const speak = useCallback(
      async (text: string, language: 'english' | 'russian') => {
        let voice: SpeechSynthesisVoice;

        if (language === 'english') {
          if (voices.english) {
            voice = voices.english;
          } else if (voices.engBackup) {
            voice = voices.engBackup;
          } else {
            return;
          }
        } else if (language === 'russian') {
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
          start: () => console.info('Start speaking...'),
          pause: e => {
            console.info('Pause');
          },
          end: () => {
            console.info('Done speaking...');
            set_voice_speaking();
          },
          error: e => {
            console.info('Something vent wrong...', e);
          },
        });
      },
      [
        set_voice_speaking,
        voices.engBackup,
        voices.english,
        voices.rusBackup,
        voices.russian,
      ]
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
        set_voice_speaking(_id, type);
      }
    }, [_id, active, filteredText, language, set_voice_speaking, speak, cancel, type]);

    return (
      <div
        className={className}
        data-active={active}
        data-speaking={speakerSpeaking}
        onClick={clickSpeaker}
        ref={ref}
      >
        <svg>
          <use href='../img/sprite.svg#icon__speaker'></use>
        </svg>
      </div>
    );
  }
);

Speaker.displayName = 'Speaker';

export default Speaker;

// Supplemental functions
// ==============================
// ==============================
// ==============================

const detectLanguage = (text: string) => {
  if (text !== '' && text) {
    let arrRus = text.match(/[а-яА-ЯЁё]/g);
    let arrEng = text.match(/[a-zA-Z]/g);

    if (!arrRus && !arrEng) return false;

    let lengthRus = arrRus ? arrRus.length : 0;
    let lengthEng = arrEng ? arrEng.length : 0;

    let lengthTotal = lengthRus + lengthEng;
    return lengthEng / lengthTotal > 0.5 ? 'english' : 'russian';
  } else {
    return false;
  }
};

const filterLang = (text: string, lang: 'english' | 'russian') => {
  let filtered = text;
  if (lang === 'english') {
    filtered = filtered.replace(/[а-яА-ЯЁё]/g, '');
  } else if (lang === 'russian') {
    filtered = filtered.replace(/[a-zA-Z]/g, '');
  }

  return filtered;
};

const filterText = (text: string) =>
  text
    .replace(/<[^>]*>/g, ' ')
    .replace(/\( \/[^/]*\/ \)/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\.\.\./g, '. ');
