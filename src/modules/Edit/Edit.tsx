import { useRouter } from "next/router";
import { memo, useEffect } from "react";

import { useActions, useAppSelector } from "../../store/hooks";
import Cards from "./components/Cards";
import Intro from "./components/Intro";
import Module from "./components/Module";

const Edit = () => {
  const { getModule, getDraft, resetModuleData } = useActions();

  const router = useRouter();
  const { _id } = router.query;

  const user = useAppSelector(s => s.auth.user);

  useEffect(() => {
    if (user) {
      resetModuleData();
      if (_id === "draft") getDraft();
      else if (typeof _id === "string") getModule(_id);
    }
  }, [user, _id, resetModuleData, getDraft, getModule]);

  useEffect(() => {
    return () => {
      resetModuleData();
    };
  }, [resetModuleData]);

  return (
    <>
      <Intro />
      <Module />
      <Cards />
    </>
  );
};

export default memo(Edit);
