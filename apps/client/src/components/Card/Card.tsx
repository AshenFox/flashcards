import Speaker from "@components/Speaker";
import { filterRegex } from "@flashcards/common/src/functions/filterRegex";
import { usePlug } from "@helpers/hooks/usePlug";
import { useActions } from "@store/hooks";
import { Card as CardType } from "@store/reducers/main/types";
import ConfirmPopup from "@ui/ConfirmPopup";
import DateStr from "@ui/DateStr";
import Img from "@ui/Img";
import TextArea from "@ui/TextArea";
import { memo, useCallback } from "react";

import { Edit, SR, SRDrop } from "./components/controls";
import ModuleLink from "./components/ModuleLink";
import s from "./styles.module.scss";

type CardProps = {
  data: CardType;
  isModuleLink?: boolean;
  filter?: string;
  filterType?: string;
};

const Card = ({
  data,
  isModuleLink = false,
  filter = null,
  filterType = null,
}: CardProps) => {
  const { setCardQuestion, dropCardSR } = useActions();

  const {
    term = "",
    definition = "",
    imgurl = "",
    _id,
    moduleID,
    creation_date,
    question,
  } = data;

  const filterRegExp = new RegExp(filterRegex(filter), "g");

  const replacement = `<span class=${s.highlighted_text}>${filter}</span>`;

  let formatted_term: string, formatted_definition: string;

  if (filterType === "term")
    formatted_term = term.replace(filterRegExp, replacement);
  if (filterType === "definition")
    formatted_definition = definition.replace(filterRegExp, replacement);

  const [visible, ref, Plug] = usePlug(s.card);

  const onConfirm = useCallback(() => {
    dropCardSR(_id);
  }, [_id, dropCardSR]);

  const setActive = useCallback(
    (value: boolean) => {
      setCardQuestion({ _id, value });
    },
    [_id, setCardQuestion],
  );

  return (
    <>
      {visible ? (
        <div className={s.card} ref={ref}>
          <div className={s.header}>
            <div className={s.created}>
              <span>
                Created <DateStr date={creation_date} />
              </span>
            </div>
            {isModuleLink && <ModuleLink moduleId={moduleID} />}
          </div>
          <div className={s.main}>
            <div className={s.term}>
              <TextArea
                html={filterType === "term" && filter ? formatted_term : term}
              />
              <div className={s.controls}>
                <Edit data={data} />
                <SR data={data} />
                <SRDrop data={data} />
              </div>
              <ConfirmPopup
                className={s.confirm}
                active={question}
                setActive={setActive}
                onConfirm={onConfirm}
                question="Drop card study progress?"
              />
              <Speaker
                _id={_id}
                text={term}
                type={"term"}
                className={s.speaker}
              />
            </div>
            <div className={s.definition_container}>
              <div className={s.definition}>
                <TextArea
                  html={
                    filterType === "definition" && filter
                      ? formatted_definition
                      : definition
                  }
                />
                <Speaker
                  _id={_id}
                  text={definition}
                  type={"definition"}
                  className={s.speaker}
                />
              </div>
              <Img
                containerClass={s.img_container}
                imgClass={s.img}
                url={imgurl}
                isHideOnLoading={false}
              />
            </div>
          </div>
        </div>
      ) : (
        Plug
      )}
    </>
  );
};

export default memo(Card);
