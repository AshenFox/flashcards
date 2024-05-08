import Filter, { Option } from "@components/Filter";
import { useActions, useAppSelector } from "@store/hooks";
import { memo } from "react";

import s from "./styles.module.scss";

const optionsBy: Option[] = [
  { value: "term", label: "Term" },
  { value: "defenition", label: "Definition" },
];

const Param = () => {
  const search_cards = useAppSelector((s) => s.main.search_cards);
  const select_by = useAppSelector((s) => s.main.select_by);
  const currentModule = useAppSelector((s) => s.main.module);

  const { _id, number } = currentModule || {};

  const {
    control_search_cards,
    reset_fields_cards,
    set_select_by,
    get_module_cards,
  } = useActions();

  const getData = () => {
    get_module_cards(_id);
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
        resetData={reset_fields_cards}
        search={{
          value: search_cards.value,
          setValue: control_search_cards,
          placeholder: "Type to filter by ...",
        }}
        selects={[
          {
            id: "by",
            value: select_by,
            options: optionsBy,
            setValue: set_select_by,
          },
        ]}
      />
    </div>
  );
};

export default memo(Param);
