import { axiosInstance } from "@flashcards/common";
import { saveLastUpdate } from "@store/helper-functions";
import { useActions, useAppSelector } from "@store/hooks";
import { Button } from "@ui/InteractiveElement";
import { useCallback, useRef, useState } from "react";

import s from "./styles.module.scss";

const ImportCards = () => {
  const { importCards } = useActions();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentModule = useAppSelector(s => s.main.module);

  const handleClick = useCallback(() => {
    if (isLoading) return;
    fileInputRef.current?.click();
  }, [isLoading]);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !currentModule?._id) return;

      try {
        setIsLoading(true);
        const text = await file.text();
        const cards = JSON.parse(text);

        const res = await axiosInstance.put<{ cards: any[] }>(
          "/api/edit/cards",
          {
            moduleId: currentModule._id,
            cards,
          },
        );

        importCards({ cards: res.data.cards });
        saveLastUpdate();
      } catch (err) {
        console.error("Error importing cards:", err);
      } finally {
        setIsLoading(false);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [importCards, currentModule?._id],
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
      <Button
        onClick={handleClick}
        design="plain"
        className={s.import}
        loading={isLoading}
      >
        Import
      </Button>
    </>
  );
};

export default ImportCards;
