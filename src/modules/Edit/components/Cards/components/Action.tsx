import Container from "@components/Container";
import { useAppSelector } from "@store/hooks";
import { Link } from "@ui/InteractiveElement";
import { memo } from "react";

import Save from "../../Save/Save";
import s from "./styles.module.scss";

const Action = () => {
  const currentModule = useAppSelector(s => s.main.module);

  const { _id, draft } = currentModule || {};

  return (
    <div className={s.action}>
      <Container>
        <div className={s.action_module}>
          {draft ? <Save /> : <Link href={`/module/${_id}`}>Return</Link>}
        </div>
      </Container>
    </div>
  );
};

export default memo(Action);
