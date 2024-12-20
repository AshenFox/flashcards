import Filter, { Option, SetFilterValue } from "@components/Filters";
import NotFound from "@components/NotFound";
import { useActions } from "@store/hooks";
import { useAppSelector } from "@store/store";
import ScrollLoader from "@ui/ScrollLoader";
import React, { Fragment, memo, useCallback, useEffect, useMemo } from "react";

import Divider from "../components/Divider";
import s from "../styles.module.scss";
import Module from "./components/Module";

const optionsBy: Option[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

const Modules = () => {
  const modules = useAppSelector(s => s.main.homeModules.data.entries);
  const draft = useAppSelector(s => s.main.draft);
  const loading = useAppSelector(s => s.main.homeModules.loading);
  const filters = useAppSelector(s => s.main.homeModules.filters);
  const { search } = filters;

  const {
    get_home_modules,
    reset_home_modules_data,
    reset_home_modules_filters,
    set_entry_collection_filter,
  } = useActions();

  const setFilterValue = useCallback<SetFilterValue>(
    (filter, value) => {
      set_entry_collection_filter("homeModules", filter, value);
    },
    [set_entry_collection_filter],
  );

  useEffect(() => {
    return () => {
      reset_home_modules_data;
      reset_home_modules_filters;
    };
  }, []);

  const filtersData = useMemo(
    () => [
      {
        id: "created",
        label: "Date Order",
        options: optionsBy,
        alwaysReload: true,
      },
    ],
    [],
  );

  return (
    <>
      <Filter
        filtersValues={filters}
        filtersData={filtersData}
        placeholder={"Type to filter..."}
        className={s.filter}
        setFilterValue={setFilterValue}
        getData={get_home_modules}
        resetData={reset_home_modules_data}
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
