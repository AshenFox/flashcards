import { useAppSelector } from '@store/store';
import React, { Fragment, memo } from 'react';
import Divider from '../Divider';
import Module from '@modules/Home/content/Module';
import ScrollLoader from '@ui/ScrollLoader';
import NotFound from '@components/NotFound';

const Modules = () => {
  const modules = useAppSelector(s => s.main.modules);
  const draft = useAppSelector(s => s.main.draft);
  const search_modules = useAppSelector(s => s.main.search_modules);
  const loading = useAppSelector(s => s.main.loading);

  return (
    <>
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
            <Divider prevDateString={prevDateString} curDateString={curDateString} />
            <Module data={module} filter={search_modules.value} />
          </Fragment>
        );
      })}
      <ScrollLoader active={loading} />
      {!loading && (
        <NotFound
          resultsFound={modules.length}
          filterValue={search_modules.value}
          notFoundMsg={value => (
            <p>
              No modules matching <b>{`"${value}"`}</b> found.
            </p>
          )}
          nothingMsg={<>You don&apos;t have any modules yet.</>}
        />
      )}
    </>
  );
};

export default memo(Modules);
