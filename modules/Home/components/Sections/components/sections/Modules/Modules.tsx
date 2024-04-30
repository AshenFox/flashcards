import { useAppSelector } from '@store/store';
import React, { Fragment, memo } from 'react';
import Divider from '../components/Divider';
import Module from './components/Module';
import ScrollLoader from '@ui/ScrollLoader';
import NotFound from '@components/NotFound';
import Filter, { Option } from '@components/Filter';
import { useActions } from '@store/hooks';
import s from '../styles.module.scss';

const optionsBy: Option[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
];

const Modules = () => {
  const modules = useAppSelector(s => s.main.modules);
  const draft = useAppSelector(s => s.main.draft);
  const loading = useAppSelector(s => s.main.loading);
  const search_modules = useAppSelector(s => s.main.search_modules);
  const select_created = useAppSelector(s => s.main.select_created);

  const {
    get_modules,
    control_search_modules,
    reset_fields_modules,
    set_select_created,
  } = useActions();

  return (
    <>
      <Filter
        className={s.filter}
        getData={get_modules}
        resetData={reset_fields_modules}
        search={{
          value: search_modules.value,
          setValue: control_search_modules,
          placeholder: 'Type to filter...',
        }}
        selects={[
          {
            id: 'created',
            value: select_created,
            options: optionsBy,
            setValue: set_select_created,
          },
        ]}
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
