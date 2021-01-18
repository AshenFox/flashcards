import PropTypes from 'prop-types';
import SRIndicator from '../../main/SRIngicator';

const CardSRControl = ({ data }) => {
  const { _id } = data;

  return (
    <div className='module__card-controls-item module__card-study-regime'>
      <input
        className='module__checkbox'
        type='checkbox'
        id={`card_sr_${_id}`}
        /* checked={studyRegime} */
      />
      <SRIndicator data={data} classStr={'sr-indicator--module'} />
      <label className='module__toggle-switch sm' htmlFor={`card_sr_${_id}`} />
    </div>
  );
};

CardSRControl.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CardSRControl;
