import { useActions, useAppSelector } from "@store/hooks";
import { CardsIcon } from "@ui/Icons";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";

import Controls, { ControlButtons } from "../components/Controls";
import Content from "./components/Content";
import { EndGameBtn, ShuffleBtn } from "./components/ControlButtons";
import Progress from "./components/Progress";

const Flashcards = () => {
  const {
    getModuleCards,
    resetModuleData,
    resetAllGameFields,
    getSRCards,
    prepareFlashcards,
  } = useActions();

  const router = useRouter();
  const { _id, number } = router.query;

  const isSR = _id === "sr";

  const cards = useAppSelector(s => s.main.cards);
  const user = useAppSelector(s => s.auth.user);

  const { length } = Object.values(cards);

  useEffect(() => {
    if (user) {
      if (isSR && typeof number === "string") getSRCards(+number);
      else if (typeof _id === "string") getModuleCards(_id);
    }
  }, [user]);

  useEffect(() => {
    return () => {
      resetAllGameFields();
      resetModuleData();
    };
  }, []);

  useEffect(() => {
    if (length) prepareFlashcards();
  }, [length]);

  return (
    <>
      <Controls
        title="Flashcards"
        titleIcon={<CardsIcon height="40" width="40" />}
      >
        <Progress />
        <ControlButtons>
          {!isSR && <ShuffleBtn />}
          <EndGameBtn />
        </ControlButtons>
      </Controls>
      <Content />
    </>
  );
};

export default memo(Flashcards);
