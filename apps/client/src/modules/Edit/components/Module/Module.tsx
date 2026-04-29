import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { useSaveState } from "@modules/Edit/components/Save/useSaveActive";
import { useEditContext } from "@modules/Edit/context";
import {
  useEditIsLoading,
  useEditModule,
  useEditModuleTitleControl,
} from "@modules/Edit/hooks";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
import TextLabel from "@ui/TextLabel";
import {
  type ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

import Save from "../Save/Save";
import { ExportCards, ImportCards, SaveAllCards } from "./components";
import s from "./styles.module.scss";

const Module = () => {
  const { selectionActive, toggleSelectionActive } = useEditContext();
  const { onTitleChange } = useEditModuleTitleControl();

  const editModule = useEditModule();
  const loading = useEditIsLoading();

  const { title = "", draft, _id: moduleId } = editModule || {};

  const [localTitle, setLocalTitle] = useState(title);

  useEffect(() => {
    setLocalTitle(title);
  }, [title, moduleId]);

  const handleModuleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalTitle(value);
      onTitleChange(value);
    },
    [onTitleChange],
  );

  const { active } = useSaveState();

  const errMessage =
    draft && active
      ? "PLEASE ENTER A TITLE AND ENSURE SAVING OF AT LEAST 2 CARDS"
      : "PLEASE ENTER A TITLE";

  const inputId = `module_${moduleId}`;

  return (
    <div className={s.module}>
      <ContentWrapper tagType="section">
        <Container>
          <div className={s.content}>
            <div className={s.title}>
              <Input
                value={localTitle}
                onChange={handleModuleChange}
                className={s.input}
                // error={!active}
                id={inputId}
                disabled={loading}
              />
              <TextLabel
                htmlFor={inputId}
                errorMessage={errMessage}
                error={!active}
              >
                TITLE
              </TextLabel>
            </div>
          </div>

          <div className={s.control}>
            <div className={s.left}>
              {draft && <Save />}

              <Button
                className={s.toggle_selection}
                onClick={toggleSelectionActive}
                design="plain"
              >
                {selectionActive ? "Stop Selection" : "Select"}
              </Button>
            </div>
            <div className={s.right}>
              {selectionActive && (
                <>
                  <SaveAllCards />
                  <ExportCards />
                </>
              )}
              <ImportCards />
            </div>
          </div>
        </Container>
      </ContentWrapper>
    </div>
  );
};

export default memo(Module);
