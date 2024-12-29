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
    getModuleCards,
    clear_module,
    prepare_write,
    reset_all_game_fields,
    get_sr_cards,
  } = useActions();

  const cards = useAppSelector(s => s.main.cards);
  const user = useAppSelector(s => s.auth.user);

  const router = useRouter();
  const { _id, number } = router.query;

  const isSR = _id === "sr";

  const { length } = Object.values(cards);

  useEffect(() => {
    return () => {
      reset_all_game_fields();
      clear_module();
    };
  }, []);

  useEffect(() => {
    if (user) {
      if (isSR && typeof number === "string") get_sr_cards(+number);
      else if (typeof _id === "string") getModuleCards(_id);
    }
  }, [user]);

  useEffect(() => {
    if (length) {
      prepare_write();
      // cardPrev.current = cards;
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
