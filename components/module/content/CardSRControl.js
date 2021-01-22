import { useRef } from 'react';
import PropTypes from 'prop-types';
import SRIndicator from '../../main/SRIngicator';
import { connect } from 'react-redux';
import { set_card_sr, set_cards_sr_positive } from '../../../store/actions/srActions';

const CardSRControl = ({ data, set_card_sr, set_cards_sr_positive }) => {
  const { _id, studyRegime } = data;

  const up = (e) => {
    e.preventDefault();
    clearTimeout(timer.current);

    if (timer.current) {
      set_card_sr(_id, !studyRegime);
    }
  };

  const down = (e) => {
    timer.current = setTimeout(() => {
      timer.current = false;
      if (!studyRegime) set_cards_sr_positive(_id);
    }, 550);
  };

  const timer = useRef(false);

  return (
    <div className='module__card-controls-item module__card-study-regime'>
      <input
        className='module__checkbox'
        type='checkbox'
        id={`card_sr_${_id}`}
        checked={studyRegime}
        readOnly
      />
      <SRIndicator data={data} classStr={'sr-indicator--module'} />
      <label
        className='module__toggle-switch sm'
        htmlFor={`card_sr_${_id}`}
        onMouseDown={down}
        onMouseUp={up}
        onTouchStart={down}
        onTouchEnd={up}
      />
    </div>
  );
};

CardSRControl.propTypes = {
  set_card_sr: PropTypes.func.isRequired,
  set_cards_sr_positive: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { set_card_sr, set_cards_sr_positive })(
  CardSRControl
);
