import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_game_controls_dimen } from '../../../store/actions/dimenActions';
import Link from 'next/link';

const Controls = ({ set_game_controls_dimen }) => {
  const onSizeChange = () => {
    set_game_controls_dimen(controllsEl.current);
  };

  useEffect(() => {
    set_game_controls_dimen(controllsEl.current);
    window.addEventListener('resize', onSizeChange);
    window.addEventListener('orientationchange', onSizeChange);

    return () => {
      window.removeEventListener('resize', onSizeChange);
      window.removeEventListener('orientationchange', onSizeChange);
    };
  }, []);

  const controllsEl = useRef(false);

  return (
    <div className='game__container'>
      <div className='game__controls-container' ref={controllsEl}>
        <div className='game__controls'>
          <div className='game__back'>
            <button className='btn grey ai-c ta-l fz17 width100 pad15-20 h-bcc-yellow'>
              {/* onclick='active.return()' */}
              <svg height='15' width='15'>
                <use href='../img/sprite.svg#icon__triangle_left'></use>
              </svg>
              <span>Back</span>
            </button>
          </div>

          <div className='game__title'>
            <svg height='40' width='40'>
              <use href='../img/sprite.svg#icon__write'></use>
            </svg>
            <span>Write</span>
          </div>

          <div className='game__progress'>
            <div className='game__progress-item'>
              <div className='game__progress-bar full' id='bar-remaining'>
                <div
                  className='game__bar-fill'
                  style={{ width: '100%' }}
                  id='fill-remaining'
                ></div>
              </div>
              <div className='game__progress-info'>
                <div className='game__progress-title show'>
                  <span>remaining</span>
                </div>

                <div className='game__progress-count'>
                  <span id='count-remaining'>10</span>
                  {/* ${this.number} */}
                </div>
              </div>
            </div>

            <div className='game__progress-item'>
              <div className='game__progress-bar full red' id='bar-incorrect'>
                <div
                  className='game__bar-fill red'
                  style={{ width: '0%' }}
                  id='fill-incorrect'
                ></div>
              </div>
              <div className='game__progress-info'>
                <div className='game__progress-title show'>
                  <span>incorrect</span>
                </div>

                <div className='game__progress-count'>
                  <span id='count-incorrect'>0</span>
                </div>
              </div>
            </div>

            <div className='game__progress-item'>
              <div className='game__progress-bar full green' id='bar-correct'>
                <div
                  className='game__bar-fill green'
                  style={{ width: '0%' }}
                  id='fill-correct'
                ></div>
              </div>
              <div className='game__progress-info'>
                <div className='game__progress-title show'>
                  <span>correct</span>
                </div>

                <div className='game__progress-count'>
                  <span id='count-correct'>0</span>
                </div>
              </div>
            </div>
          </div>

          <div className='game__control-buttons'>
            <div className='game__startover'>
              <button className='btn width100 fz15 pad7 br2 brc-grey-medium brr5 lightblue h-yellow h-brc-yellow'>
                {/* onclick='' */}
                <span>Options</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Controls.propTypes = {
  set_game_controls_dimen: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { set_game_controls_dimen })(Controls);
