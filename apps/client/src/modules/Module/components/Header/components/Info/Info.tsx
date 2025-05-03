import { useActions, useAppSelector } from "@store/hooks";
import ConfirmPopup from "@ui/ConfirmPopup";
import DateStr from "@ui/DateStr";
import { DeleteIcon, EditIcon } from "@ui/Icons";
import Skeleton from "@ui/Skeleton";
import Tooltip from "@ui/Tooltip";
import Link from "next/link";
import { memo, MouseEvent, useCallback } from "react";

import SR from "./components/SR";
import SRDrop from "./components/SRDrop";
import s from "./styles.module.scss";

const Info = () => {
  const { changeModal, toggleModal, setModuleQuestion, dropCardsSR } =
    useActions();

  const author = useAppSelector(s => s.main.module?.author);
  const _id = useAppSelector(s => s.main.module?._id);
  const creation_date = useAppSelector(s => s.main.module?.creation_date);
  const question = useAppSelector(s => s.main.module?.question);
  const loading = useAppSelector(s => s.main.sections?.module.loading);

  const openModal = (value: "delete") => (e: MouseEvent<HTMLDivElement>) => {
    changeModal({ active_modal: value });
    toggleModal();
  };

  const setActive = useCallback(
    (value: boolean) => {
      setModuleQuestion({ value });
    },
    [setModuleQuestion],
  );

  return (
    <div className={s.info}>
      <div className={s.author}>
        <span className={s.created}>
          {loading && !creation_date ? (
            <Skeleton width={"15rem"} />
          ) : (
            !!creation_date && (
              <>
                Created <DateStr date={creation_date} /> by
              </>
            )
          )}
        </span>
        <span className={s.nickname}>
          {loading && !author ? <Skeleton width={"15rem"} /> : author}
        </span>
      </div>

      <div className={s.nav}>
        <ConfirmPopup
          className={s.confirm}
          active={question}
          setActive={setActive}
          onConfirm={dropCardsSR}
          question="Drop all cards study progress?"
        />
        <SRDrop />
        <SR />
        <Link href={`/edit/${_id}`}>
          <div className={s.nav_item} data-tooltip-id="edit-module">
            <EditIcon width="25" height="25" />
          </div>
          <Tooltip id="edit-module">Edit module</Tooltip>
        </Link>

        <div
          className={s.nav_item}
          onClick={openModal("delete")}
          data-tooltip-id="delete-module"
        >
          <DeleteIcon width="25" height="25" />
          <Tooltip id="delete-module">Delete module</Tooltip>
        </div>
      </div>
    </div>
  );
};

export default memo(Info);
