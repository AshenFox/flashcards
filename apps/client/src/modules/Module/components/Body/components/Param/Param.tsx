import Filters, { FilterData, SetFilterValue } from "@components/Filters";
import { useQueryClient } from "@tanstack/react-query";
import Skeleton from "@ui/Skeleton";
import { defaultModuleCardsFilters } from "@zustand/filters";
import { useRouter } from "next/router";
import { memo, useCallback } from "react";

import {
  getModuleCardsQueryKey,
  useModuleCardsUIStore,
  useModuleFiltersStore,
  useModuleQuery,
} from "../../../../hooks";
import s from "./styles.module.scss";

const filtersData: FilterData[] = [
  {
    id: "created",
    label: "Date Order",
    defaultValue: defaultModuleCardsFilters.created,
    options: [
      { value: "no-order", label: "No order" },
      { value: "newest", label: "Newest" },
      { value: "oldest", label: "Oldest" },
    ],
  },
  {
    id: "sr",
    label: "SR",
    defaultValue: defaultModuleCardsFilters.sr,
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
    defaultValue: defaultModuleCardsFilters.by,
    options: [
      { value: "term", label: "Term" },
      { value: "definition", label: "Definition" },
    ],
  },
];

const Param = () => {
  const router = useRouter();
  const { _id } = router.query;

  const moduleId = typeof _id === "string" ? _id : undefined;

  const { data, isLoading: moduleLoading } = useModuleQuery();

  const currentModule = data?.module ?? null;
  const cardCount = currentModule?.cards.length ?? 0;

  const queryClient = useQueryClient();
  const filters = useModuleFiltersStore(state => state.filters);
  const setFilter = useModuleFiltersStore(state => state.setFilter);
  const resetFilters = useModuleFiltersStore(state => state.resetFilters);
  const resetUIStore = useModuleCardsUIStore(state => state.reset);

  const setFilterValue = useCallback<SetFilterValue>(
    (filter, value) => {
      setFilter(filter as keyof typeof filters, value);
    },
    [setFilter],
  );

  const getData = useCallback(() => {
    if (!moduleId) return;
    queryClient.invalidateQueries({
      queryKey: getModuleCardsQueryKey(moduleId),
    });
  }, [moduleId, queryClient]);

  const resetData = useCallback(() => {
    resetUIStore();
  }, [resetUIStore]);

  return (
    <div className={s.param}>
      <div className={s.count}>
        {moduleLoading && !cardCount ? (
          <Skeleton width={"20rem"} />
        ) : (
          <>
            <span>{"Terms in this set ( "}</span>
            <span>{cardCount}</span>
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
        resetData={resetData}
        resetFilters={resetFilters}
      />
    </div>
  );
};

export default memo(Param);
