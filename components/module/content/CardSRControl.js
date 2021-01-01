import PropTypes from 'prop-types';

const CardSRControl = ({ data }) => {
  const { _id } = data;
  return (
    <div className='module__card-study-regime'>
      <input
        className='module__checkbox'
        type='checkbox'
        id={`card_sr_${_id}`}
        /* checked={studyRegime} */
      />
      {/* ${
      this.switchCounter
      } */}
      {/* ${studyRegime ? "checked" : ""} */}
      <svg height='17' width='17'>
        <use href='../img/sprite.svg#icon__studyregime'></use>
      </svg>
      <span>Card study regime</span>
      <label className='module__toggle-switch sm' htmlFor={`card_sr_${_id}`} />
    </div>
  );
};

CardSRControl.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CardSRControl;
