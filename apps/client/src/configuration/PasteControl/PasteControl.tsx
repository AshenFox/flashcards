import { sanitizeConfig } from "@flashcards/config";
import { memo, useEffect } from "react";
import sanitize from "sanitize-html";

const PasteControl = () => {
  useEffect(() => {
    const pasteControl = (e: ClipboardEvent) => {
      // Influences paste on the page
      e.preventDefault();

      const cleanText = sanitize(
        e.clipboardData.getData("text/plain"),
        sanitizeConfig,
      );

      document.execCommand("insertHTML", false, cleanText);
    };

    document.documentElement.addEventListener("paste", pasteControl);

    return () =>
      document.documentElement.removeEventListener("paste", pasteControl);
  }, []);
  return <></>;
};

export default memo(PasteControl);
