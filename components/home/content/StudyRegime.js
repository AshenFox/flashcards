import PropTypes from 'prop-types';

const StudyRegime = () => {
  return (
    <div className='home__module home__module--v2'>
      <div className='home__module-container'>
        <div className='home__module-title home__module-title--v2'>
          Study Regime
        </div>
        <ul className='home__study-regime-info'>
          <li>
            <span>60{/* all cards in the regime */} cards</span> in the regime.
          </li>
          <li className=''>
            {/* hidden */}
            <span>
              10 {/* number */}card{/* "card" */}
              {/* "more cards" */}
            </span>{' '}
            to repeat in 10 hours.{/* how many houes */}
          </li>
        </ul>
      </div>

      <div className='home__repeat'>
        <p>
          Currently you have <span>10 cards</span> to repeat.
        </p>
        <p className=''>{/* hidden */}Repeat with:</p>
        <div className='home__repeat-methods'>
          {/* hidden */}
          <div className='home__counter-container'>
            <div className='home__counter'>
              <div className='home__counter-subtract'>
                <span>-</span>
              </div>
              <div className='home__counter-number'>
                {/* contentEditable='true' */}
                10
              </div>
              <div className='home__counter-add'>
                <span>+</span>
              </div>
            </div>
          </div>
          <div className='home__repeat-item' data-game='flashcards'>
            <svg height='35' width='35'>
              <use href='../img/sprite.svg#icon__cards'></use>
            </svg>
          </div>
          <div className='home__repeat-item' data-game='write'>
            <svg height='35' width='35'>
              <use href='../img/sprite.svg#icon__write'></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

StudyRegime.propTypes = {};

export default StudyRegime;
