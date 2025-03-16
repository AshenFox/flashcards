import Modal from "@modules/Modal";
import Start from "@modules/Start";
import { memo } from "react";

const StartPage = () => {
  return (
    <>
      <Start />
      <Modal />
    </>
  );
};

export default memo(StartPage);
