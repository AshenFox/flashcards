import Filters, { FilterData, SetFilterValue } from "@components/Filters";
import { useActions, useAppSelector } from "@store/hooks";
import { defaultModuleFilters } from "@store/reducers/main/initState";
import Skeleton from "@ui/Skeleton";
import { memo, useCallback } from "react";

import s from "./styles.module.scss";

const filtersData: FilterData[] = [
  {
    id: "created",
    label: "Date Order",
    defaultValue: defaultModuleFilters.created,
    options: [
      { value: "no-order", label: "No order" },
      { value: "newest", label: "Newest" },
      { value: "oldest", label: "Oldest" },
    ],
  },
  {
    id: "sr",
    label: "SR",
    defaultValue: defaultModuleFilters.sr,
    options: [
      { value: "all", label: "All" },
      { value: "in-lowest", label: "In Lowest" },
      { value: "in-highest", label: "In Highest" },
      { value: "out", label: "Out" },
    ],
  },
  {
    id: "by",
    label: "By",
    defaultValue: defaultModuleFilters.by,
    options: [
      { value: "term", label: "Term" },
      { value: "definition", label: "Definition" },
    ],
  },
];

const Param = () => {
  const _id = useAppSelector(s => s.main.module?._id);
  const number = useAppSelector(s => s.main.module?.cards.length);
  const filters = useAppSelector(s => s.main.sections.module.filters);
  const loading = useAppSelector(s => s.main.sections.module.loading);

  const {
    setSectionFilter,
    resetSectionFilters,
    resetModuleCardsData,
    getModule,
  } = useActions();

  const setFilterValue = useCallback<SetFilterValue>(
    (filter, value) => {
      setSectionFilter({
        section: "module",
        filter,
        value,
      });
    },
    [setSectionFilter],
  );

  const resetFilters = useCallback(() => {
    resetSectionFilters("module");
  }, [resetSectionFilters]);

  const getData = useCallback(() => {
    getModule(_id);
  }, [_id, getModule]);

  return (
    <div className={s.param}>
      <div className={s.count}>
        {loading && !number ? (
          <Skeleton width={"20rem"} />
        ) : (
          <>
            <span>{"Terms in this set ( "}</span>
            <span>{number ? number : 0}</span>
            <span>{" )"}</span>
          </>
        )}
      </div>
      <Filters
        id="module-param-filters"
        filtersValues={filters}
        filtersData={filtersData}
        placeholder={"Type to filter..."}
        className={s.filter}
        alwaysReload
        setFilterValue={setFilterValue}
        getData={getData}
        resetData={resetModuleCardsData}
        resetFilters={resetFilters}
      />
    </div>
  );
};

export default memo(Param);
