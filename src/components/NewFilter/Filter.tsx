import { Option } from "@components/Filter";
import { noop } from "@helpers/functions/noop";
import { FilterIcon, UndoIcon } from "@ui/Icons";
import FilledFilterIcon from "@ui/Icons/components/FilledFilterIcon";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
import clsx from "clsx";
import { ChangeEventHandler, memo, useCallback, useRef, useState } from "react";
import Select, { Options } from "react-select";

import { createCustomTheme, customStyles } from "./helpers";
import s from "./styles.module.scss";

type FilterProps = {
  className?: string;
  search?: {
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
  };
  selects?: {
    id: string;
    // label: string;
    value: Option;
    options: Options<Option>;
    setValue: (value: Option) => void;
    alwaysReload?: boolean;
  }[];
  getData: () => void;
  resetData: () => void;
};

const Filter = ({
  className,
  search,
  selects,
  getData,
  resetData,
}: FilterProps) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterEmpty, setIsFilterEmpty] = useState(true);

  const toggleFilter = useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);

  const onInnerSearchChange: ChangeEventHandler<HTMLInputElement> = e => {
    search.setValue(e.target.value);
    resetData();

    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      getData();
    }, 500);
  };

  return (
    <div className={clsx(s.filter, className)}>
      <div className={s.container}>
        {!!search && (
          <div className={s.search}>
            <Input
              placeholder={search.placeholder}
              value={search.value}
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
        )}
        {isFilterOpen && (
          <div className={s.group_container}>
            <div className={s.group}>
              {selects?.map(select => {
                const onChange = (value: Option) => {
                  select.setValue(value);

                  if (search.value || select.alwaysReload) {
                    resetData();
                    getData();
                  }
                };

                return (
                  <div className={s.group_item} key={select.id}>
                    <label className={s.select_label}>Date Order</label>
                    <Select<Option>
                      instanceId={select.id}
                      className={s.select}
                      options={select.options}
                      onChange={onChange}
                      value={select.value}
                      isSearchable={false}
                      theme={createCustomTheme}
                      styles={customStyles}
                    />
                  </div>
                );
              })}
              <div className={s.group_item}>
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
              </div>
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

export default memo(Filter);
