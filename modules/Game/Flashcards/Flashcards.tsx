import { useActions, useAppSelector } from "@store/hooks";
import { CardsIcon } from "@ui/Icons";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";

import Controls, { ControlButtons } from "../components/Controls";
import Content from "./components/Content";
import ShuffleBtn from "./components/ControlButtons/ShuffleBtn";
import Progress from "./components/Progress";

const Flashcards = () => {
  const {
    get_module_cards,
    clear_module,
    reset_all_game_fields,
    get_sr_cards,
  } = useActions();

  const router = useRouter();
  const { _id, number } = router.query;

  const isSR = _id === "sr";

  const { user } = useAppSelector(({ auth }) => auth);

  useEffect(() => {
    if (user) {
      if (isSR && typeof number === "string") get_sr_cards(+number);
      else if (typeof _id === "string") get_module_cards(_id);
    }
  }, [user]);

  useEffect(() => {
    return () => {
      reset_all_game_fields();
      clear_module();
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
