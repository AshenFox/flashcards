import Filter, { Option } from "@components/Filter";
import { useActions, useAppSelector } from "@store/hooks";
import { memo, useCallback } from "react";

import s from "./styles.module.scss";

const optionsBy: Option[] = [
  { value: "term", label: "Term" },
  { value: "definition", label: "Definition" },
];

const Param = () => {
  const search_cards = useAppSelector(s => s.main.search_cards);
  const select_by = useAppSelector(s => s.main.select_by);
  const currentModule = useAppSelector(s => s.main.module);

  const { _id, number } = currentModule || {};

  const { controlSearchCards, resetFieldsCards, setSelectBy, getModuleCards } =
    useActions();

  const setValue = useCallback(
    (value: string) => {
      controlSearchCards({ value });
    },
    [controlSearchCards],
  );

  const getData = () => {
    getModuleCards(_id);
  };

  return (
    <div className={s.param}>
      <div className={s.count}>
        <span>{"Terms in this set ( "}</span>
        <span>{number ? number : 0}</span>
        <span>{" )"}</span>
      </div>
      <Filter
        className={s.search}
        getData={getData}
        resetData={resetFieldsCards}
        search={{
          value: search_cards.value,
          setValue,
          placeholder: "Type to filter by ...",
        }}
        selects={[
          {
            id: "by",
            value: select_by,
            options: optionsBy,
            setValue: setSelectBy,
          },
        ]}
      />
    </div>
  );
};

export default memo(Param);
