import { useAppSelector } from "@store/hooks";
import { memo } from "react";

import Delete from "./Delete";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import s from "./styles.module.scss";

const Content = () => {
  const active_modal = useAppSelector((s) => s.modal.active_modal);

  return (
    <div className={s.content}>
      {active_modal === "log_in" && <LogIn />}
      {active_modal === "sign_up" && <SignUp />}
      {active_modal === "delete" && <Delete />}
    </div>
  );
};

export default memo(Content);
