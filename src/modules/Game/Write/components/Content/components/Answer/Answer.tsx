import Speaker from "@components/Speaker";
import SRIndicator from "@components/SRIndicator";
import { useActions, useAppSelector } from "@store/hooks";
import { Card } from "@store/reducers/main/mainInitState";
import { EditIcon } from "@ui/Icons";
import Img from "@ui/Img";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
import TextArea from "@ui/TextArea";
import TextLabel from "@ui/TextLabel";
import { tooltipContainer } from "@ui/Tooltip";
import clsx from "clsx";
import { useRouter } from "next/router";
import { ChangeEvent, memo, MouseEvent, useEffect, useRef } from "react";

import s from "./styles.module.scss";

type AnswerProps = {
  data: Card;
};

const Answer = ({ data }: AnswerProps) => {
  const {
    set_card_edit,
    set_write_copy_answer_field,
    next_write_card,
    override_write_answer,
    put_sr_answer,
  } = useActions();

  const router = useRouter();
  const { _id: _id_param } = router.query;

  const isSR = _id_param === "sr";

  const { _id, term, definition, imgurl } = data;

  const answer = useAppSelector(s => s.game.write.answer);
  const copy_answer = useAppSelector(s => s.game.write.copy_answer);
  const remaining = useAppSelector(s => s.game.write.remaining);
  const rounds = useAppSelector(s => s.game.write.rounds);

  const activeCard = remaining[remaining.length - 1];
  let isCorrect = false;
  if (activeCard.answer === "correct") isCorrect = true;
  if (activeCard.answer === "incorrect") isCorrect = false;

  const isEmpty = !answer && term;
  const copiedCorrectly = copy_answer === term.replace(/&nbsp;/g, " ").trim();

  const isFirstRound = useRef(!rounds.length);
  isFirstRound.current = !rounds.length;

  const canContinue = useRef(false);

  const copyAnswerInput = useRef<HTMLInputElement>(null);

  const gameAnswer = useRef<HTMLDivElement>(null);

  if (isCorrect) {
    canContinue.current = true;
  } else {
    if (isEmpty) {
      if (copiedCorrectly) canContinue.current = true;
    } else {
      canContinue.current = true;
    }
  }

  const changeCopyAnswer = (e: ChangeEvent<HTMLInputElement>) =>
    set_write_copy_answer_field(e.target.value);

  const clickEdit = (e: MouseEvent<HTMLDivElement>) => set_card_edit(_id, true);

  const continueGame = () => {
    if (canContinue.current) {
      if (isFirstRound.current && isSR) put_sr_answer(_id, isCorrect ? 1 : -1);
      next_write_card();
    }
  };

  const overrideAnswer = () => {
    if (isFirstRound.current && isSR) put_sr_answer(_id, 1);
    override_write_answer();
  };

  const clickContinue = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    continueGame();
  };

  const clickOverride = (e: MouseEvent<HTMLButtonElement>) => {
    overrideAnswer();
  };

  const keyDownControl = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      continueGame();
    }

    if (e.key === "o") {
      if (!isCorrect && !isEmpty) {
        overrideAnswer();
      }
    }
  };

  useEffect(() => {
    if (gameAnswer.current) gameAnswer.current.focus();
    if (copyAnswerInput.current) copyAnswerInput.current.focus();

    window.addEventListener("keydown", keyDownControl);

    return () => {
      window.removeEventListener("keydown", keyDownControl);
    };
  }, []);

  return (
    <div className={s.answer} tabIndex={0} ref={gameAnswer}>
      {isSR && (
        <SRIndicator
          data={data}
          className={clsx(s.sr_indicator, tooltipContainer)}
        />
      )}
      <div className={clsx(s.edit, isSR && s.sr)} onClick={clickEdit}>
        <EditIcon width="21" height="21" />
      </div>
      <h1 className={clsx(s.type, activeCard.answer && s[activeCard.answer])}>
        {activeCard.answer}
      </h1>

      <div>
        <div className={s.section}>
          <span className={s.section_title}>Definition</span>
          <Img containerClass={s.img_container} imgClass={s.img} url={imgurl} />
          <div className={s.section_body}>
            <TextArea html={definition} />
            <Speaker
              _id={_id}
              text={definition}
              type={"definition"}
              className={s.speaker}
            />
          </div>
        </div>
        {!isCorrect && !isEmpty && (
          <div className={s.section}>
            <span className={s.section_title}>You said</span>
            <div className={s.section_body}>
              <div>{answer}</div>
              <div className={s.override}>
                <Button onClick={clickOverride} design="plain">
                  Override: I was right
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className={s.section}>
          <span className={s.section_title}>Correct</span>
          <div className={s.section_body}>
            <TextArea html={term} />
            <Speaker
              _id={_id}
              text={term}
              type={"term"}
              className={s.speaker}
            />
          </div>
        </div>

        {!isCorrect && isEmpty && (
          <form action="" className={s.form} autoComplete="off">
            <fieldset className={s.fieldset}>
              <Input
                className={clsx(s.input, copiedCorrectly && s.correct)}
                id="write-input"
                autoComplete="off"
                value={copy_answer}
                onChange={changeCopyAnswer}
                inputRef={copyAnswerInput}
                movingBorder
              />
              <TextLabel htmlFor="write-input">copy answer</TextLabel>
            </fieldset>
          </form>
        )}
      </div>

      <div className={s.continue} data-correct={canContinue.current}>
        <Button onClick={clickContinue}>Click to continue</Button>
      </div>
    </div>
  );
};

export default memo(Answer);
