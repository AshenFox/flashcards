import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { useActions, useAppSelector } from "@store/hooks";
import TextArea from "@ui/TextArea";
import TextLabel from "@ui/TextLabel";
import { useRouter } from "next/router";
import { memo, useCallback, useRef } from "react";
import { ContentEditableEvent } from "react-contenteditable";

import { Save } from "./components";
import s from "./styles.module.scss";

const Module = () => {
  const { control_module, edit_module } = useActions();

  const router = useRouter();
  const { _id } = router.query;

  const isDraft = _id === "draft";

  const currentModule = useAppSelector(s => s.main.module);
  const cards = useAppSelector(s => s.main.cards);
  const loading = useAppSelector(s => s.main.loading);

  const { title, draft, _id: moduleId } = currentModule || {};

  const handleModuleChange = useCallback(
    (e: ContentEditableEvent) => {
      control_module(e.target.value);

      clearTimeout(timer.current);
      timer.current = setTimeout(async () => {
        edit_module();
        timer.current = null;
      }, 500);
    },
    [control_module, edit_module],
  );

  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const cardsArr = Object.values(cards);

  let twoSaved = false;
  let counter = 0;

  if (draft) {
    for (const card of cardsArr) {
      if (card.save === true) {
        ++counter;
        if (counter >= 2) {
          twoSaved = true;
          break;
        }
      }
    }
  }

  let active = draft ? !!(twoSaved && title) : !!title;
  if (!cardsArr.length) active = true;

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
          {(draft || isDraft) && (
            <div className={s.control}>
              <Save />
            </div>
          )}
        </Container>
      </ContentWrapper>
    </div>
  );
};

export default memo(Module);
