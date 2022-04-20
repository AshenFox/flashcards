import { FC, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  control_search_cards,
  control_search_modules,
  reset_fields_cards,
  reset_fields_modules,
  set_select_by,
  set_select_created,
  get_modules,
  get_module_cards,
  get_cards,
} from '../../../store/actions/mainActions';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../store/store';

const optionsBy = [
  { value: 'term', label: 'Term' },
  { value: 'defenition', label: 'Definition' },
];

const optionsCreated = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
];

const createCustomTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#ffcd1f',
    primary: '#ffcd1f',
  },
});

const customStyles = {
  dropdownIndicator: (provided) => ({
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

  const dispatch = useAppDispatch();

  const { search_cards, search_modules, select_by, select_created, module } =
    useAppSelector(({ main }) => main);

  const { _id } = module || {};

  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const changeSearchCards = (e) => {
    dispatch(control_search_cards(e.target.value));
    clearTimeout(timer.current);
    dispatch(reset_fields_cards());
    timer.current = setTimeout(() => {
      isModulePath ? dispatch(get_module_cards(_id)) : dispatch(get_cards());
    }, 500);
  };

  const controlSearchModules = (e) => {
    dispatch(control_search_modules(e.target.value));
    clearTimeout(timer.current);
    dispatch(reset_fields_modules());
    timer.current = setTimeout(() => {
      dispatch(get_modules());
    }, 500);
  };

  const changeSelectBy = (value) => {
    dispatch(set_select_by(value));
    if (search_cards.value) {
      dispatch(reset_fields_cards());
      console.log('fire!');
      isModulePath ? dispatch(get_module_cards(_id)) : dispatch(get_cards());
    }
  };

  const changeSelectCreated = (value) => {
    dispatch(set_select_created(value));

    if (isModulePath) {
      dispatch(reset_fields_cards());
      dispatch(get_module_cards(_id));
    } else {
      if (isCards) {
        dispatch(reset_fields_cards());
        dispatch(get_cards());
      }
      if (isModules) {
        dispatch(reset_fields_modules());
        dispatch(get_modules());
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
        <input
          type='text'
          className='input pad5 fz17 height4r br-bottom2 bc-none brc-grey f-brc-yellow'
          placeholder={
            isCards || isModulePath ? 'Type to filter by ...' : 'Type to filter...'
          }
          value={isCards || isModulePath ? search_cards.value : search_modules.value}
          onChange={isCards || isModulePath ? changeSearchCards : controlSearchModules}
        />
        <div className={isModulePath ? 'module__select-group' : 'home__select-group'}>
          {(isModulePath || isCards) && (
            <Select
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
            <Select
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
