import Modal from "@modules/Modal";
import Module from "@modules/Module";
import { memo } from "react";

const ModulePage = () => {
  return (
    <>
      <Module />
      <Modal />
    </>
  );
};

export default memo(ModulePage);
