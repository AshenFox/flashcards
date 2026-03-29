import { editImportCards } from "@api/methods";
import { queryClient } from "@api/queryClient";
import {
  getEditCardsQueryKey,
  useEditModule,
  useEditResolvedModuleId,
} from "@modules/Edit/hooks";
import { saveLastUpdate } from "@store/helper-functions";
import { Button } from "@ui/InteractiveElement";
import { useCallback, useRef, useState } from "react";

import s from "./styles.module.scss";

const ImportCards = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const editModule = useEditModule();
  const resolvedModuleId = useEditResolvedModuleId();

  const handleClick = useCallback(() => {
    if (isLoading) return;
    fileInputRef.current?.click();
  }, [isLoading]);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editModule?._id) return;

      try {
        setIsLoading(true);
        const text = await file.text();
        const cards = JSON.parse(text);

        await editImportCards(editModule._id, cards);

        saveLastUpdate();
        if (resolvedModuleId) {
          await queryClient.invalidateQueries({
            queryKey: getEditCardsQueryKey(resolvedModuleId),
          });
        }
      } catch (err) {
        console.error("Error importing cards:", err);
      } finally {
        setIsLoading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [editModule?._id, resolvedModuleId],
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
