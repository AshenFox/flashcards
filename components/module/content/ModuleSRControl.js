import PropTypes from 'prop-types';

const ModuleSRControl = (props) => {
  return (
    <div className='module__study-regime'>
      <input className='module__checkbox' type='checkbox' id='toggleswitch' />
      <svg height='30' width='30'>
        <use href='../img/sprite.svg#icon__studyregime'></use>
      </svg>
      <span>All cards study regime</span>
      <label className='module__toggle-switch' htmlFor='toggleswitch'></label>
    </div>
  );
};

ModuleSRControl.propTypes = {};

export default ModuleSRControl;
