import { useActions, useAppSelector } from "@store/hooks";
import ConfirmPopup from "@ui/ConfirmPopup";
import DateStr from "@ui/DateStr";
import { DeleteIcon, EditIcon } from "@ui/Icons";
import Link from "next/link";
import { memo, MouseEvent } from "react";
import Skeleton from "react-loading-skeleton";

import SR from "./components/SR";
import SRDrop from "./components/SRDrop";
import s from "./styles.module.scss";

const Info = () => {
  const { change_modal, toggle_modal, set_module_question, drop_cards_sr } =
    useActions();

  const currentModule = useAppSelector(s => s.main.module);

  const { author, _id, creation_date, question } = currentModule || {};

  const openModal = (value: "delete") => (e: MouseEvent<HTMLDivElement>) => {
    change_modal(value);
    toggle_modal();
  };

  return (
    <div className={s.info}>
      <div className={s.author}>
        <span className={s.created}>
          Created <DateStr date={creation_date} /> by
        </span>
        <span className={s.nickname}>
          {module ? author : <Skeleton width={100} />}
        </span>
      </div>

      <div className={s.nav}>
        <ConfirmPopup
          className={s.confirm}
          active={question}
          setActive={set_module_question}
          onConfirm={drop_cards_sr}
          question="Drop all cards study progress?"
        />
        <SRDrop />
        <SR />
        <Link href={`/edit/${_id}`}>
          <div className={s.nav_item}>
            <EditIcon width="25" height="25" />
          </div>
        </Link>
        <div className={s.nav_item} onClick={openModal("delete")}>
          <DeleteIcon width="25" height="25" />
        </div>
      </div>
    </div>
  );
};

export default memo(Info);
