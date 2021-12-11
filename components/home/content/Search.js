import { useRef } from 'react';
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

const Search = ({
  main,
  control_search_cards,
  control_search_modules,
  set_select_by,
  set_select_created,
  reset_fields_cards,
  reset_fields_modules,
  get_modules,
  get_module_cards,
  get_cards,
}) => {
  const { search_cards, search_modules, select_by, select_created, module } = main;

  const router = useRouter();

  const { pathname } = router;
  const { section } = router.query;

  const timer = useRef(false);

  const changeSearchCards = (e) => {
    control_search_cards(e.target.value);
    clearTimeout(timer.current);
    reset_fields_cards();
    timer.current = setTimeout(() => {
      isModulePath ? get_module_cards(module._id) : get_cards();
    }, 500);
  };

  const controlSearchModules = (e) => {
    control_search_modules(e.target.value);
    clearTimeout(timer.current);
    reset_fields_modules();
    timer.current = setTimeout(() => {
      get_modules();
    }, 500);
  };

  const changeSelectBy = (value) => {
    set_select_by(value);
    if (search_cards.value) {
      reset_fields_cards();
      console.log('fire!');
      isModulePath ? get_module_cards(module._id) : get_cards();
    }
  };

  const changeSelectCreated = (value) => {
    set_select_created(value);

    if (isModulePath) {
      reset_fields_cards();
      get_module_cards(module._id);
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

Search.propTypes = {
  main: PropTypes.object.isRequired,
  control_search_cards: PropTypes.func.isRequired,
  control_search_modules: PropTypes.func.isRequired,
  set_select_by: PropTypes.func.isRequired,
  set_select_created: PropTypes.func.isRequired,
  reset_fields_cards: PropTypes.func.isRequired,
  reset_fields_modules: PropTypes.func.isRequired,
  get_modules: PropTypes.func.isRequired,
  get_cards: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, {
  control_search_cards,
  control_search_modules,
  set_select_by,
  set_select_created,
  reset_fields_cards,
  reset_fields_modules,
  get_modules,
  get_module_cards,
  get_cards,
})(Search);
