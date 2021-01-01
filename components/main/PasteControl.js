import { useEffect } from 'react';
import PropTypes from 'prop-types';

const PasteControl = () => {
  useEffect(() => {
    const pasteControl = (e) => {
      // Influences paste on the page
      e.preventDefault();
      let text = (e.originalEvent || e).clipboardData.getData('text/plain');
      document.execCommand('insertHTML', false, text);
    };
    document.documentElement.addEventListener('paste', pasteControl);

    return () =>
      document.documentElement.removeEventListener('paste', pasteControl);
  }, []);
  return <></>;
};

PasteControl.propTypes = {};

export default PasteControl;
