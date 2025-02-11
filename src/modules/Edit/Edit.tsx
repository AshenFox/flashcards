import { useRouter } from "next/router";
import { memo, useEffect } from "react";

import { useActions, useAppSelector } from "../../store/hooks";
import CardsContainer from "./components/Cards/Cards";
import Intro from "./components/Intro";
import Module from "./components/Module";

const Edit = () => {
  const { getModule, getDraft, clearModule } = useActions();

  const router = useRouter();
  const { _id } = router.query;

  const user = useAppSelector(s => s.auth.user);

  useEffect(() => {
    if (user) {
      clearModule();
      if (_id === "draft") getDraft();
      else if (typeof _id === "string") getModule(_id);
    }
  }, [user, _id, clearModule, getDraft, getModule]);

  useEffect(() => {
    return () => {
      clearModule();
    };
  }, [clearModule]);

  return (
    <>
      <Intro />
      <Module />
      <CardsContainer />
    </>
  );
};

export default memo(Edit);
