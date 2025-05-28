import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { useSaveState } from "@modules/Edit/components/Save/useSaveActive";
import { useEditContext } from "@modules/Edit/context";
import { useActions, useAppSelector } from "@store/hooks";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
import TextLabel from "@ui/TextLabel";
import { memo, useCallback, useRef } from "react";
import { ContentEditableEvent } from "react-contenteditable";

import Save from "../Save/Save";
import TagSelectorExample from "../TagSelector/TagSelectorExample";
import { ExportCards, ImportCards, SaveAllCards } from "./components";
import s from "./styles.module.scss";

const Module = () => {
  const { selectionActive, toggleSelectionActive } = useEditContext();
  const { controlModule, editModule } = useActions();

  const currentModule = useAppSelector(s => s.main.module);
  const loading = useAppSelector(
    s => s.main.sections.editDraft.loading || s.main.sections.module.loading,
  );

  const { title, draft, _id: moduleId } = currentModule || {};

  const handleModuleChange = useCallback(
    (e: ContentEditableEvent) => {
      controlModule({ value: e.target.value });

      clearTimeout(timer.current);
      timer.current = setTimeout(async () => {
        editModule();
        timer.current = null;
      }, 500);
    },
    [controlModule, editModule],
  );

  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const { active } = useSaveState();

  const errMessage =
    draft && selectionActive
      ? "PLEASE ENTER A TITLE AND ENSURE SAVING OF AT LEAST 2 CARDS"
      : "PLEASE ENTER A TITLE";

  const inputId = `module_${moduleId}`;

  return (
    <div className={s.module}>
      <ContentWrapper tagType="section">
        <Container>
          <TagSelectorExample />
          <div className={s.content}>
            <div className={s.title}>
              <Input
                value={title ?? ""}
                onChange={handleModuleChange}
                className={s.input}
                error={!active}
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
