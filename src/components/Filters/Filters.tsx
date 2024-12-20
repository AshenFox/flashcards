import { noop } from "@helpers/functions/noop";
import { DefaultFilters } from "@store/reducers/main/mainInitState";
import { FilterIcon, UndoIcon } from "@ui/Icons";
import FilledFilterIcon from "@ui/Icons/components/FilledFilterIcon";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
import clsx from "clsx";
import { ChangeEventHandler, memo, useCallback, useRef, useState } from "react";

import Filter from "./Filter";
import s from "./styles.module.scss";
import { FilterData, SetFilterValue } from "./types";

export type FiltersProps = {
  filtersValues: DefaultFilters;
  filtersData?: FilterData[];
  placeholder?: string;
  className?: string;
  setFilterValue?: SetFilterValue;
  getData: () => void;
  resetData: () => void;
};

const Filters = ({
  filtersValues,
  filtersData,
  placeholder,
  className,
  setFilterValue,
  getData,
  resetData,
}: FiltersProps) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterEmpty, setIsFilterEmpty] = useState(true);

  const toggleFilter = useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);

  const onInnerSearchChange: ChangeEventHandler<HTMLInputElement> = e => {
    setFilterValue("search", e.target.value);

    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      resetData();
      getData();
    }, 300);
  };

  return (
    <div className={clsx(s.filter, className)}>
      <div className={s.container}>
        <div className={s.search}>
          <Input
            placeholder={placeholder}
            value={filtersValues.search}
            onChange={onInnerSearchChange}
            className={s.search}
          />
          <Button
            design="plain"
            className={clsx(s.filter_btn, {
              [s.active]: isFilterOpen,
              [s.filled]: !isFilterEmpty,
            })}
            icon={isFilterEmpty ? <FilterIcon /> : <FilledFilterIcon />}
            onClick={toggleFilter}
          />
        </div>
        {isFilterOpen && (
          <div className={s.group_container}>
            <div className={s.group}>
              {filtersData?.map(filter => {
                const value = filtersValues[filter.id];

                return (
                  <Filter
                    key={filter.id}
                    value={value}
                    filter={filter}
                    setFilterValue={setFilterValue}
                    getData={getData}
                    resetData={resetData}
                  />
                );
              })}
              {/* <div className={s.group_item}>
                <label className={s.select_label}>SR</label>
                <Select<Option>
                  instanceId={"testid"}
                  className={s.select}
                  options={[
                    {
                      value: "all",
                      label: "All",
                    },
                    {
                      value: "true",
                      label: "In",
                    },
                    {
                      value: "false",
                      label: "Out",
                    },
                  ]}
                  onChange={noop}
                  isSearchable={false}
                  theme={createCustomTheme}
                  styles={customStyles}
                />
              </div>
              <div className={s.group_item}>
                <label className={s.select_label}>Draft</label>
                <Select<Option>
                  instanceId={"testid"}
                  className={s.select}
                  options={[
                    {
                      value: "true",
                      label: "Show",
                    },
                    {
                      value: "false",
                      label: "Hide",
                    },
                  ]}
                  onChange={noop}
                  isSearchable={false}
                  theme={createCustomTheme}
                  styles={customStyles}
                />
              </div> */}
            </div>
            <div className={s.group}>
              <div className={s.group_item}>
                <div className={s.reset}>
                  <Button
                    design="plain"
                    className={clsx(s.filter_btn)}
                    icon={<UndoIcon />}
                    onClick={noop}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Filters);
