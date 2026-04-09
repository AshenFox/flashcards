import { useModuleCardsQuery, useModuleQuery } from "@modules/Module/hooks";
import { useActions } from "@store/hooks";
import ConfirmPopup from "@ui/ConfirmPopup";
import DateStr from "@ui/DateStr";
import { DeleteIcon, EditIcon } from "@ui/Icons";
import Skeleton from "@ui/Skeleton";
import Tooltip from "@ui/Tooltip";
import Link from "next/link";
import { memo, MouseEvent, useCallback, useState } from "react";

import SR from "./components/SR";
import SRDrop from "./components/SRDrop";
import { useDropAllCardsSR } from "./hooks";
import s from "./styles.module.scss";

const Info = () => {
  const { data: moduleData, isLoading: moduleLoading } = useModuleQuery();
  const { data: cardsData, isLoading: cardsLoading } = useModuleCardsQuery();

  const currentModule = moduleData?.module;
  const cards = cardsData?.entries ?? [];

  const { changeModal, toggleModal } = useActions();
  const dropAllCardsSR = useDropAllCardsSR();

  const [question, setQuestion] = useState(false);

  const openModal = (value: "delete") => (_e: MouseEvent<HTMLDivElement>) => {
    changeModal({ active_modal: value });
    toggleModal();
  };

  const setActive = useCallback((value: boolean) => {
    setQuestion(value);
  }, []);

  const onActivateQuestion = useCallback(() => {
    setQuestion(true);
  }, []);

  return (
    <div className={s.info}>
      <div className={s.author}>
        <span className={s.created}>
          {moduleLoading && !currentModule?.creation_date ? (
            <Skeleton width={"15rem"} />
          ) : (
            !!currentModule?.creation_date && (
              <>
                Created <DateStr date={currentModule.creation_date} /> by
              </>
            )
          )}
        </span>
        <span className={s.nickname}>
          {moduleLoading && !currentModule?.author ? (
            <Skeleton width={"15rem"} />
          ) : (
            currentModule?.author
          )}
        </span>
      </div>

      <div className={s.nav}>
        <ConfirmPopup
          className={s.confirm}
          active={question}
          setActive={setActive}
          onConfirm={dropAllCardsSR}
          question="Drop all cards study progress?"
        />
        <SRDrop
          moduleId={currentModule?._id}
          question={question}
          onActivate={onActivateQuestion}
        />
        <SR cards={cards} loading={cardsLoading} />
        <Link href={`/edit/${currentModule?._id}`}>
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
