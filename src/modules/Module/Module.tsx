import { useActions, useAppSelector } from "@store/hooks";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";

import Body from "./components/Body/Body";
import Header from "./components/Header/Header";

const Module = () => {
  const { getModule, clearModule, resetSearch } = useActions();

  const router = useRouter();
  const { _id } = router.query;

  const user = useAppSelector(s => s.auth.user);

  useEffect(() => {
    if (user && typeof _id === "string") getModule(_id);
  }, [user]);

  useEffect(() => {
    return () => {
      clearModule();
      resetSearch();
    };
  }, []);

  return (
    <>
      <Header />
      <Body />
    </>
  );
};

export default memo(Module);
