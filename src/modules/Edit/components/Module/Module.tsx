import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { useSaveState } from "@modules/Edit/components/Save/useSaveActive";
import { useActions, useAppSelector } from "@store/hooks";
import TextArea from "@ui/TextArea";
import TextLabel from "@ui/TextLabel";
import { memo, useCallback, useRef } from "react";
import { ContentEditableEvent } from "react-contenteditable";

import Save from "../Save/Save";
import { SaveAllCards } from "./components";
import s from "./styles.module.scss";

const Module = () => {
  const { controlModule, editModule } = useActions();

  const currentModule = useAppSelector(s => s.main.module);
  const loading = useAppSelector(s => s.main.loading);

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

  const errMessage = draft
    ? "PLEASE ENTER A TITLE AND ENSURE SAVING OF AT LEAST 2 CARDS"
    : "PLEASE ENTER A TITLE";

  const textAreaId = `module${moduleId}`;

  return (
    <div className={s.module}>
      <ContentWrapper tagType="section">
        <Container>
          <div className={s.content}>
            <div className={s.title}>
              <TextArea
                html={title ?? ""}
                disabled={loading}
                className={s.textarea}
                onChange={handleModuleChange}
                isStyled
                error={!active}
                id={textAreaId}
              />
              <TextLabel
                htmlFor={textAreaId}
                errorMessage={errMessage}
                error={!active}
              >
                TITLE
              </TextLabel>
            </div>
          </div>
          {draft && (
            <div className={s.control}>
              <SaveAllCards />
              <Save />
            </div>
          )}
        </Container>
      </ContentWrapper>
    </div>
  );
};

export default memo(Module);
