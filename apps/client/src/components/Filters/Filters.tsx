import { DefaultFilters } from "@store/reducers/main/types";
import { FilterIcon, UndoIcon } from "@ui/Icons";
import FilledFilterIcon from "@ui/Icons/components/FilledFilterIcon";
import Input from "@ui/Input";
import { Button } from "@ui/InteractiveElement";
import Tooltip from "@ui/Tooltip";
import clsx from "clsx";
import {
  ChangeEventHandler,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Filter from "./Filter";
import s from "./styles.module.scss";
import { FilterData, SetFilterValue } from "./types";

export type FiltersProps = {
  filtersValues: DefaultFilters;
  filtersData: FilterData[];
  id?: string;
  placeholder?: string;
  className?: string;
  alwaysReload?: boolean;
  setFilterValue?: SetFilterValue;
  getData: () => void;
  resetData: () => void;
  resetFilters: () => void;
};

const Filters = ({
  filtersValues,
  filtersData,
  id,
  placeholder,
  className,
  alwaysReload,
  setFilterValue,
  getData,
  resetData,
  resetFilters,
}: FiltersProps) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [areFiltersRestored, setAreFiltersRestored] = useState(false);

  const isFilterEmpty = useMemo(
    () =>
      filtersData.every(
        ({ id, defaultValue }) => defaultValue === filtersValues[id],
      ),
    [filtersData, filtersValues],
  );

  const toggleFilter = useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);

  const onInnerSearchChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => {
      setFilterValue("search", e.target.value);

      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        resetData();
        getData();
      }, 300);
    },
    [getData, resetData, setFilterValue],
  );

  const onResetClick = useCallback(() => {
    if (isFilterEmpty) return;
    resetFilters();
    resetData();
    getData();
  }, [isFilterEmpty, getData, resetFilters, resetData]);

  useLayoutEffect(() => {
    if (!id || areFiltersRestored) return;

    const savedFilters =
      (JSON.parse(localStorage.getItem(id)) as DefaultFilters) ?? {};

    Object.entries(savedFilters).forEach(([id, value]) => {
      setFilterValue(id, value);
    });

    setAreFiltersRestored(true);
  }, [id, areFiltersRestored, setFilterValue]);

  useEffect(() => {
    if (!id || !areFiltersRestored) return;

    localStorage.setItem(
      id,
      JSON.stringify({ ...filtersValues, search: undefined }),
    );
  }, [areFiltersRestored, filtersValues, id]);

  useEffect(() => {
    return () => {
      setFilterValue("search", "");
    };
  }, [setFilterValue]);

  const filterBtnId = `${id}-filter-btn`;
  const resetBtnId = `${id}-reset-btn`;

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
            id={filterBtnId}
          />
          <Tooltip id={filterBtnId}>
            {isFilterOpen ? "Close filters" : "Open filters"}
          </Tooltip>
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
                    alwaysReload={alwaysReload}
                    setFilterValue={setFilterValue}
                    getData={getData}
                    resetData={resetData}
                  />
                );
              })}
            </div>
            <div className={s.group}>
              <div className={s.group_item}>
                <div className={s.reset}>
                  <Button
                    id={resetBtnId}
                    design="plain"
                    className={clsx(s.filter_btn, {
                      [s.disabled]: isFilterEmpty,
                    })}
                    icon={<UndoIcon />}
                    onClick={onResetClick}
                  />
                  {!isFilterEmpty && (
                    <Tooltip id={resetBtnId}>Reset filters</Tooltip>
                  )}
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
