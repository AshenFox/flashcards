import Speaker from "@components/Speaker";
import SRIndicator from "@components/SRIndicator";
import { useActions, useAppSelector } from "@store/hooks";
import { Card } from "@store/reducers/main/mainInitState";
import Img from "@ui/Img";
import Input from "@ui/Input";
import TextArea from "@ui/TextArea";
import TextLabel from "@ui/TextLabel";
import { tooltipContainer } from "@ui/Tooltip";
import clsx from "clsx";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  FormEventHandler,
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";

import s from "./styles.module.scss";

type QuestionProps = {
  data: Card;
};

const Question = ({ data }: QuestionProps) => {
  const { set_write_answer_field, check_write_answer } = useActions();

  const router = useRouter();

  const { _id: _id_param } = router.query;

  const isSR = _id_param === "sr";

  const { _id, term, definition, imgurl } = data || {};
  const answer = useAppSelector(s => s.game.write.answer);

  const formattedDefinition = definition.replaceAll(
    /\( \/(.*?)\/ \)/g,
    (x, match) =>
      `( /<span class="${s.transcription_hidden}">${match}</span>/ )`,
  );

  const changeAnswer = (e: ChangeEvent<HTMLInputElement>) =>
    set_write_answer_field(e.target.value);

  const keyDownAnswer = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        check_write_answer();
      }
    },
    [check_write_answer],
  );

  const clickAnswer = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      check_write_answer();
    },
    [check_write_answer],
  );

  const clickNotKnow = useCallback(() => {
    check_write_answer(true);
  }, [check_write_answer]);

  const disableDefault = useCallback<FormEventHandler<HTMLFormElement>>(e => {
    e.preventDefault();
  }, []);

  const answerInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (answerInput.current) {
      setTimeout(() => answerInput.current.focus(), 0);
    }

    window.addEventListener("keydown", keyDownAnswer);

    return () => {
      window.removeEventListener("keydown", keyDownAnswer);
    };
  }, [keyDownAnswer]);

  return (
    <div className={s.question}>
      <div className={s.container}>
        {isSR && (
          <SRIndicator
            data={data}
            className={clsx(s.sr_indicator, tooltipContainer)}
          />
        )}
        {term && (
          <div className={s.do_not_know}>
            <span onClick={clickNotKnow}>Don&apos;t know</span>
          </div>
        )}
        <Img containerClass={s.img_container} imgClass={s.img} url={imgurl} />
        <TextArea html={formattedDefinition} className={s.definition} />
        <Speaker
          _id={_id}
          text={definition}
          type={"definition"}
          className={s.speaker}
        />
      </div>
      <form className={s.form} autoComplete="off" onSubmit={disableDefault}>
        <fieldset className={s.fieldset}>
          <Input
            id="write-input"
            className={s.input}
            movingBorder
            autoComplete="off"
            onChange={changeAnswer}
            value={answer}
            inputRef={answerInput}
          />
          <TextLabel htmlFor="write-input">type the answer</TextLabel>
        </fieldset>
        <div className={s.btn_container}>
          <button onClick={clickAnswer} type="button">
            Answer
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(Question);
