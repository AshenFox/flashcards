import { useRouter } from "next/router";
import { memo, useEffect } from "react";

import { useActions, useAppSelector } from "../../store/hooks";
import CardsContainer from "./components/Cards/Cards";
import Intro from "./components/Intro";
import Module from "./components/Module";

const Edit = () => {
  const { getModule, getDraft, clear_module } = useActions();

  const router = useRouter();
  const { _id } = router.query;

  const user = useAppSelector(s => s.auth.user);

  useEffect(() => {
    if (user) {
      clear_module();
      if (_id === "draft") getDraft();
      else if (typeof _id === "string") getModule(_id);
    }
  }, [user, _id, clear_module, getDraft, getModule]);

  useEffect(() => {
    return () => {
      clear_module();
    };
  }, [clear_module]);

  return (
    <>
      <Intro />
      <Module />
      <CardsContainer />
    </>
  );
};

export default memo(Edit);
