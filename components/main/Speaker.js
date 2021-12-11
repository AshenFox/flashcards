import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_voice_speaking } from '../../store/actions/voiceActions';

const Speaker = ({ _id, text, type, className, refProp, voice, set_voice_speaking }) => {
  const { voices, working, speaking } = voice;

  const clickSpeaker = () => {
    const synth = window.speechSynthesis;

    if (!active) return;

    if (synth.speaking) {
      stop_speaking();
    } else {
      const textForSpeaking = filterLang(filteredText, language);
      speak(textForSpeaking, language);
      set_voice_speaking(_id, type);
    }
  };

  const speak = (text, language) => {
    const synth = window.speechSynthesis;

    const SSU = new SpeechSynthesisUtterance(text);

    SSU.onend = (e) => {
      set_voice_speaking();
      console.log('Done speaking...');
    };

    SSU.onerror = (e) => {
      console.log('Something vent wrong...', e);
    };

    if (language === 'english') {
      if (voices.english) {
        SSU.voice = voices.english;
      } else if (voices.engBackup) {
        SSU.voice = voices.engBackup;
      } else {
        return;
      }
    } else if (language === 'russian') {
      if (voices.russian) {
        SSU.voice = voices.russian;
      } else if (voices.rusBackup) {
        SSU.voice = voices.rusBackup;
      } else {
        return;
      }
    }

    SSU.rate = 0.85;
    SSU.pitch = 1;

    let int = setInterval(() => {
      if (!synth.speaking) {
        clearInterval(int);
      } else {
        synth.resume();
      }
    }, 10000);

    synth.speak(SSU);
    console.log('Start speaking...');
  };

  const stop_speaking = () => window.speechSynthesis.cancel();

  const filteredText = filterText(text);
  const language = detectLanguage(filteredText);
  const active = text !== '' && language && working;

  let speakerSpeaking = false;

  if (speaking) speakerSpeaking = speaking._id === _id && speaking.type === type;

  return (
    <div
      className={className}
      data-active={active}
      data-speaking={speakerSpeaking}
      onClick={clickSpeaker}
      ref={refProp}
    >
      <svg>
        <use href='../img/sprite.svg#icon__speaker'></use>
      </svg>
    </div>
  );
};

Speaker.propTypes = {
  _id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  voice: PropTypes.object.isRequired,
  set_voice_speaking: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  voice: state.voice,
});

export default connect(mapStateToProps, { set_voice_speaking })(Speaker);

// Supplemental functions
// ==============================
// ==============================
// ==============================

const detectLanguage = (text) => {
  if (text !== '' && text) {
    let length = text.length;
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

const filterLang = (text, lang) => {
  let filtered = text;
  if (lang === 'english') {
    filtered = filtered.replace(/[а-яА-ЯЁё]/g, '');
  } else if (lang === 'russian') {
    filtered = filtered.replace(/[a-zA-Z]/g, '');
  }

  return filtered;
};

const filterText = (text) =>
  text
    .replace(/<[^>]*>/g, ' ')
    .replace(/\( \/[^/]*\/ \)/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\.\.\./g, '. ');
