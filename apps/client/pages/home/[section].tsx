import Home from "@modules/Home";
import ScrollTop from "@modules/ScrollTop";
import { memo } from "react";

const HomePage = () => {
  return (
    <>
      <Home />
      <ScrollTop />
    </>
  );
};

export default memo(HomePage);
