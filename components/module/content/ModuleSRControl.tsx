import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_cards_sr } from '../../../store/actions/srActions';

const ModuleSRControl = ({ main, set_cards_sr }) => {
  const { cards } = main;

  const cardsArr = Object.values(cards);

  let active = !!cardsArr.length;

  for (const card of cardsArr) {
    if (card.studyRegime === false) {
      active = false;
      break;
    }
  }

  const clickToggleSwitch = () => set_cards_sr(!active);

  return (
    <div className='module__study-regime'>
      <input
        className='module__checkbox'
        type='checkbox'
        id='toggleswitch'
        checked={active}
        readOnly
      />
      <svg height='30' width='30'>
        <use href='../img/sprite.svg#icon__studyregime'></use>
      </svg>
      <span>All cards study regime</span>
      <label
        className='module__toggle-switch'
        htmlFor='toggleswitch'
        onClick={clickToggleSwitch}
      />
    </div>
  );
};

ModuleSRControl.propTypes = {
  main: PropTypes.object.isRequired,
  set_cards_sr: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ main: state.main });

export default connect(mapStateToProps, { set_cards_sr })(ModuleSRControl);
