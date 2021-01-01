import { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_flashcards_side } from '../../../store/actions/gameActions';
import ContentEditable from 'react-contenteditable';
import Speaker from '../../main/Speaker';

const Card = ({
  data,
  side = 'definition',
  position = false,
  set_flashcards_side,
}) => {
  const { _id, term, defenition, imgurl } = data;

  const frontClassName = `game__card-front ${
    position ? `transparent ${position}` : ''
  } ${side === 'definition' ? '' : 'rearside'}`;
  const backClassName = `game__card-back ${
    position ? `transparent ${position}` : ''
  } ${position ? position : ''} ${side === 'term' ? '' : 'rearside'}`;

  const clickSide = (value) => (e) => set_flashcards_side(value);

  const frontSpeakerEl = useRef(false);
  const backSpeakerEl = useRef(false);

  return (
    <div className='game__card'>
      <div className={frontClassName} onClick={clickSide('term')}>
        <div className='game__img-container  '>
          <div
            className='game__img'
            style={
              imgurl
                ? {
                    backgroundImage: `url(${imgurl})`,
                  }
                : {}
            }
          ></div>
        </div>

        <div className='game__definition-container'>
          <Speaker
            _id={_id}
            text={defenition}
            type={'definition'}
            className='game__speaker-flashcards'
          />
          <div className='game__edit'>
            <svg width='21' height='21'>
              <use href='../img/sprite.svg#icon__edit'></use>
            </svg>
          </div>
          <ContentEditable
            html={defenition}
            disabled={true}
            className='game__definition'
          />
        </div>
      </div>
      <div className={backClassName} onClick={clickSide('definition')}>
        <div className='game__term-container '>
          <Speaker
            _id={_id}
            text={term}
            type={'term'}
            className='game__speaker-flashcards'
          />
          <div className='game__edit'>
            <svg width='21' height='21'>
              <use href='../img/sprite.svg#icon__edit'></use>
            </svg>
          </div>
          <ContentEditable html={term} disabled={true} className='game__term' />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { set_flashcards_side })(Card);
