import { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  set_card_save,
  set_cards_save_positive,
} from '../../../store/actions/editActions';

const EditCardSave = ({ data, set_card_save, set_cards_save_positive }) => {
  const { _id, save } = data;

  /* const changeSave = () => {
    console.log('fire!');
    set_card_save(_id, !save);
  }; */

  const up = (e) => {
    e.preventDefault();
    clearTimeout(timer.current);

    if (timer.current) {
      set_card_save(_id, !save);
    }
  };

  // includes(value)

  const down = (e) => {
    // console.log('down!');
    timer.current = setTimeout(() => {
      timer.current = false;
      if (!save) set_cards_save_positive(_id);
    }, 550);
  };

  const timer = useRef(false);

  return (
    <div className='edit__save-include'>
      <input
        className='edit__checkbox edit__checkbox--save'
        type='checkbox'
        id={`togglesave${_id}`}
        checked={save}
        /* onChange={up} */
        readOnly
      />
      <svg height='17' width='17'>
        <use href='../img/sprite.svg#icon__save'></use>
      </svg>
      <span>Save the card</span>
      <label
        className='edit__toggle-switch sm'
        htmlFor={`togglesave${_id}`}
        onMouseDown={down}
        onMouseUp={up}
        onTouchStart={down}
        onTouchEnd={up}
      ></label>
    </div>
  );
};

EditCardSave.propTypes = {
  data: PropTypes.object.isRequired,
  set_card_save: PropTypes.func.isRequired,
  set_cards_save_positive: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(false, { set_card_save, set_cards_save_positive })(
  EditCardSave
);
