import { useActions } from "@store/hooks";
import { Button } from "@ui/InteractiveElement";
import { useCallback, useRef } from "react";

import s from "./styles.module.scss";

const ImportCards = () => {
  const { importCards } = useActions();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const cards = JSON.parse(text);
        importCards(cards);
      } catch (err) {
        console.error("Error importing cards:", err);
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [importCards],
  );

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        style={{ display: "none" }}
      />
      <Button onClick={handleClick} design="plain" className={s.import}>
        Import
      </Button>
    </>
  );
};

export default ImportCards;
