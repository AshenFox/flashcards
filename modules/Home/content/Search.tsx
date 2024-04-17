import { FC, useRef } from 'react';
import { useRouter } from 'next/router';
import Select, { Options } from 'react-select';
import { useActions, useAppSelector } from '@store/hooks';
import Input from '@ui/Input';

type Option = { value: string; label: string };

const optionsBy: Options<Option> = [
  { value: 'term', label: 'Term' },
  { value: 'defenition', label: 'Definition' },
];

const optionsCreated: Options<Option> = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
];

const createCustomTheme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#ffcd1f',
    primary: '#ffcd1f',
  },
});

const customStyles = {
  dropdownIndicator: provided => ({
    ...provided,
    paddingLeft: 3,
    paddingRight: 3,
  }),
};

interface OwnProps {}

type Props = OwnProps;

const Search: FC<Props> = () => {
  const router = useRouter();

  const { pathname } = router;
  const { section } = router.query;

  const {
    control_search_cards,
    control_search_modules,
    reset_fields_cards,
    reset_fields_modules,
    set_select_by,
    set_select_created,
    get_modules,
    get_module_cards,
    get_cards,
  } = useActions();

  const { search_cards, search_modules, select_by, select_created, module } =
    useAppSelector(({ main }) => main);

  const { _id } = module || {};

  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const changeSearchCards = e => {
    control_search_cards(e.target.value);
    clearTimeout(timer.current);
    reset_fields_cards();
    timer.current = setTimeout(() => {
      isModulePath ? get_module_cards(_id) : get_cards();
    }, 500);
  };

  const controlSearchModules = e => {
    control_search_modules(e.target.value);
    clearTimeout(timer.current);
    reset_fields_modules();
    timer.current = setTimeout(() => {
      get_modules();
    }, 500);
  };

  const changeSelectBy = value => {
    set_select_by(value);
    if (search_cards.value) {
      reset_fields_cards();
      isModulePath ? get_module_cards(_id) : get_cards();
    }
  };

  const changeSelectCreated = value => {
    set_select_created(value);

    if (isModulePath) {
      reset_fields_cards();
      get_module_cards(_id);
    } else {
      if (isCards) {
        reset_fields_cards();
        get_cards();
      }
      if (isModules) {
        reset_fields_modules();
        get_modules();
      }
    }
  };

  const isModulePath = pathname === '/module/[_id]';
  const isCards = section === 'cards';
  const isModules = section === 'modules';

  return (
    <div className={isModulePath ? 'module__search' : 'home__search'}>
      <div
        className={isModulePath ? 'module__search-container' : 'home__search-container'}
      >
        <Input
          className='home__search-input'
          placeholder={
            isCards || isModulePath ? 'Type to filter by ...' : 'Type to filter...'
          }
          value={isCards || isModulePath ? search_cards.value : search_modules.value}
          onChange={isCards || isModulePath ? changeSearchCards : controlSearchModules}
        />
        <div className={isModulePath ? 'module__select-group' : 'home__select-group'}>
          {(isModulePath || isCards) && (
            <Select<Option>
              className={
                isModulePath
                  ? 'module__select module__select--1'
                  : 'home__select home__select--1'
              }
              theme={createCustomTheme}
              options={optionsBy}
              isSearchable={false}
              onChange={changeSelectBy}
              value={select_by}
              instanceId='react-select-by'
              styles={customStyles}
            />
          )}
          {!isModulePath && (
            <Select<Option>
              className={'home__select home__select--2'}
              theme={createCustomTheme}
              options={optionsCreated}
              isSearchable={false}
              onChange={changeSelectCreated}
              value={select_created}
              instanceId='react-select-created'
              styles={customStyles}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
