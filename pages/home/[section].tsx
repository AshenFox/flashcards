import Home from "@modules/Home";
import Push from "@modules/Push";
import ScrollTop from "@modules/ScrollTop";
import { memo } from "react";

const HomePage = () => {
  return (
    <>
      <Home />
      <ScrollTop />
      <Push />
    </>
  );
};

export default memo(HomePage);
