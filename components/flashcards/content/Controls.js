import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_game_controls_dimen } from '../../../store/actions/dimenActions';
import Link from 'next/link';
import Progress from './Progress';
import ShuffleBtn from './ShuffleBtn';

const Controls = ({ set_game_controls_dimen }) => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === 'sr';

  const onSizeChange = () => set_game_controls_dimen(controllsEl.current);

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
            <Link href={isSR ? '/home/sr' : `/module/${_id}`}>
              <button className='btn grey ai-c ta-l fz17 width100 pad15-20 h-bcc-yellow'>
                {' '}
                <svg height='15' width='15'>
                  <use href='../img/sprite.svg#icon__triangle_left'></use>
                </svg>
                <span>Back</span>
              </button>
            </Link>
          </div>

          <div className='game__title'>
            <svg height='40' width='40'>
              <use href='../img/sprite.svg#icon__cards'></use>
            </svg>
            <span>Flashcards</span>
          </div>

          <Progress />

          <div className='game__control-buttons '>{!isSR && <ShuffleBtn />}</div>
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

/* 

 ${
                          this.regime === "study" ? "hidden" : ""
                        } 

           <div className='game__method '>
                  <div className='game__method-tilte'>Answer with:</div>
                  <button className='btn width100 fz15 pad7 br2 brc-grey-medium brr5 lightblue h-yellow'>
                    <svg height='13' width='13'>
                      <use href='../img/sprite.svg#icon__down_arrow'></use>
                    </svg>
                    <span>Term</span>
                  </button>
                  <div className='game__method-menu-container hidden'>
                    <div className='game__method-menu'>
                      <div
                        className='game__method-menu-item'
                        data-method='term'
                      >
                        <span>Term</span>
                      </div>
                      <div
                        className='game__method-menu-item'
                        data-method='defenition'
                      >
                        <span>Defenition</span>
                      </div>
                    </div>
                  </div>
                </div> 


*/
