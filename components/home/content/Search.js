import { useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  control_search_cards,
  control_search_modules,
  reset_fields_cards,
  reset_fields_modules,
  set_select,
  get_modules,
  get_module_cards,
  get_cards,
} from '../../../store/actions/mainActions';
import Select from 'react-select';

const options = [
  { value: 'term', label: 'Term' },
  { value: 'defenition', label: 'Definition' },
];

const createCustomTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#ffcd1f',
    primary: '#ffcd1f',
  },
});

const Search = ({
  main,
  control_search_cards,
  control_search_modules,
  set_select,
  reset_fields_cards,
  reset_fields_modules,
  get_modules,
  get_module_cards,
  get_cards,
}) => {
  const { search_cards, search_modules, select, module } = main;

  const router = useRouter();

  // console.log(router);
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

  const changeSelect = (value) => {
    set_select(value);
    if (search_cards.value) {
      reset_fields_cards();
      isModulePath ? get_module_cards(module._id) : get_cards();
    }
  };

  const isModulePath = pathname === '/module/[_id]';
  const isCards = section === 'cards' || isModulePath;

  return (
    <div className={isModulePath ? 'module__search' : 'home__search'}>
      <div
        className={
          isModulePath ? 'module__search-container' : 'home__search-container'
        }
      >
        <input
          type='text'
          className='input pad5 fz17 height4r br-bottom2 bc-none brc-grey f-brc-yellow'
          placeholder={isCards ? 'Type to filter by ...' : 'Type to filter...'}
          value={isCards ? search_cards.value : search_modules.value}
          onChange={isCards ? changeSearchCards : controlSearchModules}
        />
        {isCards && (
          <Select
            className={isModulePath ? 'module__select' : 'home__select'}
            theme={createCustomTheme}
            options={options}
            isSearchable={false}
            onChange={changeSelect}
            value={select}
            instanceId='react-select'
          />
        )}
      </div>
    </div>
  );
};

Search.propTypes = {
  main: PropTypes.object.isRequired,
  control_search_cards: PropTypes.func.isRequired,
  control_search_modules: PropTypes.func.isRequired,
  set_select: PropTypes.func.isRequired,
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
  set_select,
  reset_fields_cards,
  reset_fields_modules,
  get_modules,
  get_module_cards,
  get_cards,
})(Search);
