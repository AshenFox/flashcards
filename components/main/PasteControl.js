import { useEffect } from 'react';
import PropTypes from 'prop-types';
import sanitize from 'sanitize-html';
import sanConfig from '../../config/sanitize-config.json';

const PasteControl = () => {
  useEffect(() => {
    const pasteControl = (e) => {
      // Influences paste on the page
      e.preventDefault();
      const cleanText = sanitize(
        (e.originalEvent || e).clipboardData.getData('text/plain'),
        sanConfig
      );

      document.execCommand('insertHTML', false, cleanText);
    };
    document.documentElement.addEventListener('paste', pasteControl);

    return () => document.documentElement.removeEventListener('paste', pasteControl);
  }, []);
  return <></>;
};

PasteControl.propTypes = {};

export default PasteControl;
