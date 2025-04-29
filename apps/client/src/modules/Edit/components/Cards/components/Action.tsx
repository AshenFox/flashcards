import Container from "@components/Container";
import { useAppSelector } from "@store/hooks";
import { Link } from "@ui/InteractiveElement";
import { memo } from "react";

import Save from "../../Save/Save";
import s from "./styles.module.scss";

const Action = () => {
  const draft = useAppSelector(s => s.main.module?.draft);

  return (
    <div className={s.action}>
      <Container>
        <div className={s.action_module}>
          {draft ? <Save /> : <Link isReturn>Return</Link>}
        </div>
      </Container>
    </div>
  );
};

export default memo(Action);
