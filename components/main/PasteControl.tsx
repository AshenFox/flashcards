import { FC } from 'react';
import { useEffect } from 'react';
import sanitize from 'sanitize-html';
import sanConfig from '../../config/sanitize-config.json';

interface OwnProps {}

type Props = OwnProps;

const PasteControl: FC<Props> = () => {
  useEffect(() => {
    const pasteControl = (e: ClipboardEvent) => {
      // Influences paste on the page
      e.preventDefault();

      const cleanText = sanitize(e.clipboardData.getData('text/plain'), sanConfig);

      document.execCommand('insertHTML', false, cleanText);
    };

    document.documentElement.addEventListener('paste', pasteControl);

    return () => document.documentElement.removeEventListener('paste', pasteControl);
  }, []);
  return <></>;
};

export default PasteControl;
