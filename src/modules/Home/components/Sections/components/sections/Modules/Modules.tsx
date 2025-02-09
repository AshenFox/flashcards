import Filter, { FilterData, SetFilterValue } from "@components/Filters";
import NotFound from "@components/NotFound";
import { useActions } from "@store/hooks";
import { defaultHomeModulesFilters } from "@store/reducers/main/mainInitState";
import { useAppSelector } from "@store/store";
import ScrollLoader from "@ui/ScrollLoader";
import React, { Fragment, memo, useCallback, useEffect } from "react";

import Divider from "../components/Divider";
import s from "../styles.module.scss";
import Module from "./components/Module";

const filtersData: FilterData[] = [
  {
    id: "created",
    label: "Date Order",
    defaultValue: defaultHomeModulesFilters.created,
    options: [
      { value: "newest", label: "Newest" },
      { value: "oldest", label: "Oldest" },
    ],
  },
  {
    id: "sr",
    label: "SR",
    defaultValue: defaultHomeModulesFilters.sr,
    options: [
      { value: undefined, label: "All" },
      { value: true, label: "In" },
      { value: false, label: "Out" },
    ],
  },
  {
    id: "draft",
    label: "Draft",
    defaultValue: defaultHomeModulesFilters.draft,
    options: [
      { value: true, label: "Show" },
      { value: false, label: "Hide" },
    ],
  },
];

const Modules = () => {
  const modules = useAppSelector(s => s.main.modules);
  const draft = useAppSelector(s => s.main.draft);
  const loading = useAppSelector(s => s.main.sections.homeModules.loading);
  const filters = useAppSelector(s => s.main.sections.homeModules.filters);
  const { search } = filters;

  const {
    getModules,
    resetHomeModulesData,
    resetSectionFilters,
    setSectionFilter,
  } = useActions();

  const setFilterValue = useCallback<SetFilterValue>(
    (filter, value) => {
      setSectionFilter({
        section: "homeModules",
        filter,
        value,
      });
    },
    [setSectionFilter],
  );

  const resetFilters = useCallback(() => {
    resetSectionFilters("homeModules");
  }, [resetSectionFilters]);

  useEffect(() => {
    return () => {
      resetHomeModulesData();
    };
  }, [resetHomeModulesData]);

  return (
    <>
      <Filter
        filtersValues={filters}
        filtersData={filtersData}
        placeholder={"Type to filter..."}
        className={s.filter}
        alwaysReload
        setFilterValue={setFilterValue}
        getData={getModules}
        resetData={resetHomeModulesData}
        resetFilters={resetFilters}
      />
      {draft && (
        <Fragment>
          <Divider draft={!!draft} />
          <Module data={draft} />
        </Fragment>
      )}
      {modules.map((module, i) => {
        const prevDateString = modules[i - 1]?.creation_date;
        const curDateString = module.creation_date;

        return (
          <Fragment key={module._id}>
            <Divider
              prevDateString={prevDateString}
              curDateString={curDateString}
            />
            <Module data={module} filter={search} />
          </Fragment>
        );
      })}
      <ScrollLoader active={loading} />
      {!loading && (
        <NotFound
          resultsFound={modules.length}
          filterValue={search}
          notFoundMsg={value => (
            <>
              No modules matching <b>{`"${value}"`}</b> found.
            </>
          )}
          nothingMsg={<>You don&apos;t have any modules yet.</>}
        />
      )}
    </>
  );
};

export default memo(Modules);
