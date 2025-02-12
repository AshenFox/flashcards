import { useActions, useAppSelector } from "@store/hooks";
import { CardsIcon } from "@ui/Icons";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";

import Controls, { ControlButtons } from "../components/Controls";
import Content from "./components/Content";
import ShuffleBtn from "./components/ControlButtons/ShuffleBtn";
import Progress from "./components/Progress";

const Flashcards = () => {
  const { getModuleCards, clearModule, resetAllGameFields, getSRCards } =
    useActions();

  const router = useRouter();
  const { _id, number } = router.query;

  const isSR = _id === "sr";

  const user = useAppSelector(s => s.auth.user);

  useEffect(() => {
    if (user) {
      if (isSR && typeof number === "string") getSRCards(+number);
      else if (typeof _id === "string") getModuleCards(_id);
    }
  }, [user]);

  useEffect(() => {
    return () => {
      resetAllGameFields();
      clearModule();
    };
  }, []);

  return (
    <>
      <Controls
        title="Flashcards"
        titleIcon={<CardsIcon height="40" width="40" />}
      >
        <Progress />
        <ControlButtons>{!isSR && <ShuffleBtn />}</ControlButtons>
      </Controls>
      <Content />
    </>
  );
};

export default memo(Flashcards);
