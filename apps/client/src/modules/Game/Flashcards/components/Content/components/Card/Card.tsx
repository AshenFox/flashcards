import Speaker from "@components/Speaker";
import { SRIndicator, SRInfoTooltip } from "@components/SRIndicator";
import { useActions } from "@store/hooks";
import { Card as CardType } from "@store/reducers/main/types";
import { EditIcon } from "@ui/Icons";
import Img from "@ui/Img";
import TextArea from "@ui/TextArea";
import Tooltip from "@ui/Tooltip";
import clsx from "clsx";
import { useRouter } from "next/router";
import { memo, MouseEvent } from "react";

import s from "./styles.module.scss";

type CardProps = {
  data: CardType;
  side?: "definition" | "term";
  position?: "prev" | "next";
};

const Card = ({ data, side = "definition", position = null }: CardProps) => {
  const { setFlashcardsSide, setCardEdit } = useActions();

  const router = useRouter();
  const { _id: _id_param } = router.query;

  const isSR = _id_param === "sr";

  const { _id, term, definition, imgurl } = data;

  const formattedDefinition = definition.replaceAll(
    /\(( |\u00A0|&nbsp;)*\/(.*?)\/( |\u00A0|&nbsp;)*\)/g,
    (match, space1, transcription) => {
      return `( /<span class=${s.transcription_hidden}>${transcription}</span>/ )`;
    },
  );

  const frontClassName = clsx(
    s.front,
    position && clsx(s.transparent, s[position]),
    side !== "definition" && s.rear_side,
  );

  const backClassName = clsx(
    s.back,
    position && clsx(s.transparent, s[position]),
    side !== "term" && s.rear_side,
  );

  const cardClassName = clsx(s.card, position && s.transparent);

  const clickSide =
    (value: "term" | "definition") => (e: MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest(`.${s.speaker}`)) return;
      if ((e.target as HTMLElement).closest(`.${s.edit}`)) return;
      if ((e.target as HTMLElement).closest(`.${s.sr_indicator}`)) return;
      if ((e.target as HTMLElement).closest(`.${s.transcription_hidden}`))
        return;

      setFlashcardsSide({ value });
    };

  const clickEdit = (e: MouseEvent<HTMLDivElement>) =>
    setCardEdit({ _id, value: true });

  const tooltipTermSRId = `term_${_id}`;
  const tooltipDefinitionSRId = `definition_${_id}`;
  const tooltipTermEditId = `term_edit_${_id}`;
  const tooltipDefinitionEditId = `definition_edit_${_id}`;

  return (
    <div className={cardClassName}>
      <div className={frontClassName} onClick={clickSide("term")}>
        <Img
          containerClass={clsx(s.img_container, !definition && s.full)}
          imgClass={s.img}
          url={imgurl}
        />
        {isSR && (
          <>
            <SRIndicator
              id={tooltipTermSRId}
              stage={data.stage}
              className={clsx(s.sr_indicator)}
            />
            <SRInfoTooltip id={tooltipTermSRId} place={"right"} data={data} />
          </>
        )}

        {definition && (
          <div className={clsx(s.definition_container, !imgurl && s.full)}>
            <TextArea html={formattedDefinition} className={s.definition} />
          </div>
        )}
        <Speaker
          _id={_id}
          text={definition}
          type={"definition"}
          className={s.speaker}
        />
        <div
          className={s.edit}
          onClick={clickEdit}
          data-tooltip-id={tooltipTermEditId}
        >
          <EditIcon width="21" height="21" />
        </div>
        <Tooltip id={tooltipTermEditId}>Edit card</Tooltip>
      </div>
      <div className={backClassName} onClick={clickSide("definition")}>
        {isSR && (
          <>
            <SRIndicator
              id={tooltipDefinitionSRId}
              stage={data.stage}
              className={clsx(s.sr_indicator)}
            />
            <SRInfoTooltip
              id={tooltipDefinitionSRId}
              place={"right"}
              data={data}
            />
          </>
        )}
        <div className={s.term_container}>
          <TextArea html={term} className={s.term} />
        </div>
        <Speaker _id={_id} text={term} type={"term"} className={s.speaker} />
        <div
          className={s.edit}
          onClick={clickEdit}
          data-tooltip-id={tooltipDefinitionEditId}
        >
          <EditIcon width="21" height="21" />
        </div>
        <Tooltip id={tooltipDefinitionEditId}>Edit card</Tooltip>
      </div>
    </div>
  );
};

export default memo(Card);
