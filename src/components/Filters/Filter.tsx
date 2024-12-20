import { FilterValue } from "@store/reducers/main/mainInitState";
import React, { memo, useCallback, useMemo } from "react";
import Select from "react-select";

import { createCustomTheme, customStyles } from "./helpers";
import s from "./styles.module.scss";
import { FilterData, Option, SetFilterValue } from "./types";

export type FilterProps = {
  value: FilterValue;
  filter: FilterData;
  setFilterValue: SetFilterValue;
  getData: () => void;
  resetData: () => void;
};

const Filter = ({
  value,
  filter,
  setFilterValue,
  resetData,
  getData,
}: FilterProps) => {
  const { id, label, options, alwaysReload } = filter;

  const option = useMemo(
    () => options.find(option => option.value === value),
    [options, value],
  );

  const onChange = useCallback(
    (value: Option) => {
      setFilterValue(id, value.value);

      if (value || alwaysReload) {
        resetData();
        getData();
      }
    },
    [id, alwaysReload, getData, resetData, setFilterValue],
  );

  return (
    <div className={s.group_item}>
      <label className={s.select_label}>{label}</label>
      <Select<Option>
        instanceId={id}
        className={s.select}
        value={option}
        options={options}
        onChange={onChange}
        isSearchable={false}
        theme={createCustomTheme}
        styles={customStyles}
      />
    </div>
  );
};

export default memo(Filter);
