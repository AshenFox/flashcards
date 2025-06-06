import { useActions, useAppSelector } from "@store/hooks";
import { WriteIcon } from "@ui/Icons";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";

import Controls, { ControlButtons } from "../components/Controls";
import Content from "./components/Content";
import { StartOver } from "./components/ControlButtons";
import Progress from "./components/Progress";

const Write = () => {
  const {
    resetModuleData,
    resetAllGameFields,
    getModuleCards,
    prepareWrite,
    getSRCards,
  } = useActions();

  const cards = useAppSelector(s => s.main.cards);
  const user = useAppSelector(s => s.auth.user);

  const router = useRouter();
  const { _id, number } = router.query;

  const isSR = _id === "sr";

  const { length } = Object.values(cards);

  useEffect(() => {
    return () => {
      resetAllGameFields();
      resetModuleData();
    };
  }, []);

  useEffect(() => {
    if (user) {
      if (isSR && typeof number === "string") getSRCards(+number);
      else if (typeof _id === "string") getModuleCards(_id);
    }
  }, [user]);

  useEffect(() => {
    if (length) {
      prepareWrite();
    }
  }, [length]);

  return (
    <>
      <Controls title="Write" titleIcon={<WriteIcon height="40" width="40" />}>
        <Progress />
        <ControlButtons>{!isSR && <StartOver />}</ControlButtons>
      </Controls>
      <Content />
    </>
  );
};

export default memo(Write);
