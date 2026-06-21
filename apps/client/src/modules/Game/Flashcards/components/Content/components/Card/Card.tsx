import { useSetCardEdit } from "@components/Cards/state/ui";
import Speaker from "@components/Speaker";
import { SRIndicator, SRInfoTooltipContent } from "@components/SRIndicator";
import type { CardDto } from "@flashcards/common";
import { useGameStore } from "@modules/Game/store/gameStore";
import { EditIcon } from "@ui/Icons";
import Img from "@ui/Img";
import TextArea from "@ui/TextArea";
import { Tooltip } from "@ui/Tooltip";
import clsx from "clsx";
import { useRouter } from "next/router";
import { memo, MouseEvent } from "react";

import s from "./styles.module.scss";

type CardProps = {
  data: CardDto;
  side?: "definition" | "term";
  position?: "prev" | "next";
};

const Card = ({ data, side = "definition", position = null }: CardProps) => {
  const setFlashcardsSide = useGameStore(s => s.setFlashcardsSide);
  const setCardEdit = useSetCardEdit();

  const router = useRouter();
  const { _id: _id_param } = router.query;

  const isSR = _id_param === "sr";

  const { _id, term, definition, imgurl } = data;

  const formattedDefinition = definition.replaceAll(
    /\(( |\u00A0|&nbsp;)*\/(.*?)\/( |\u00A0|&nbsp;)*\)/g,
    (_match, _space1, transcription) => {
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

      setFlashcardsSide(value);
    };

  const clickEdit = (_e: MouseEvent<HTMLDivElement>) =>
    setCardEdit({ _id, value: true });

  const srTooltip = (
    <SRInfoTooltipContent
      stage={data.stage}
      nextRep={data.nextRep}
      prevStage={data.prevStage}
      active={data.studyRegime}
    />
  );

  return (
    <div className={cardClassName}>
      <div className={frontClassName} onClick={clickSide("term")}>
        <Img
          containerClass={clsx(s.img_container, !definition && s.full)}
          contentClass={s.img_content}
          url={imgurl}
        />
        {isSR && (
          <SRIndicator
            stage={data.stage}
            className={clsx(s.sr_indicator)}
            tooltipSide="right"
            tooltip={srTooltip}
          />
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
        <Tooltip content="Edit card">
          <div className={s.edit} onClick={clickEdit}>
            <EditIcon width="21" height="21" />
          </div>
        </Tooltip>
      </div>
      <div className={backClassName} onClick={clickSide("definition")}>
        {isSR && (
          <SRIndicator
            stage={data.stage}
            className={clsx(s.sr_indicator)}
            tooltipSide="right"
            tooltip={srTooltip}
          />
        )}
        <div className={s.term_container}>
          <TextArea html={term} className={s.term} />
        </div>
        <Speaker _id={_id} text={term} type={"term"} className={s.speaker} />
        <Tooltip content="Edit card">
          <div className={s.edit} onClick={clickEdit}>
            <EditIcon width="21" height="21" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default memo(Card);
