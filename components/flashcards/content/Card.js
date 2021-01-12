import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_flashcards_side } from '../../../store/actions/gameActions';
import { set_card_edit } from '../../../store/actions/editActions';
import ContentEditable from 'react-contenteditable';
import Speaker from '../../main/Speaker';
import Img from '../../main/Img';

const Card = ({
  data,
  side = 'definition',
  position = false,
  set_flashcards_side,
  set_card_edit,
}) => {
  const { _id, term, defenition, imgurl } = data;

  const frontClassName = `game__card-front ${
    position ? `transparent ${position}` : ''
  } ${side === 'definition' ? '' : 'rearside'}`;
  const backClassName = `game__card-back ${
    position ? `transparent ${position}` : ''
  } ${position ? position : ''} ${side === 'term' ? '' : 'rearside'}`;

  const clickSide = (value) => (e) => {
    if (e.target.closest('.game__speaker-flashcards')) return;
    if (e.target.closest('.game__edit')) return;

    set_flashcards_side(value);
  };

  const clickEdit = () => set_card_edit(_id, true);

  return (
    <div className='game__card'>
      <div className={frontClassName} onClick={clickSide('term')}>
        {/* <div className={`game__img-container ${defenition ? '' : 'full'}`}>
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
        </div> */}

        <Img
          containerClass={`game__img-container ${defenition ? '' : 'full'}`}
          imgClass={'game__img'}
          url={imgurl}
        />

        {defenition && (
          <div className={`game__definition-container ${imgurl ? '' : 'full'}`}>
            <ContentEditable
              html={defenition}
              disabled={true}
              className='game__definition'
            />
          </div>
        )}
        <Speaker
          _id={_id}
          text={defenition}
          type={'definition'}
          className='game__speaker-flashcards'
        />
        <div className='game__edit' onClick={clickEdit}>
          <svg width='21' height='21'>
            <use href='../img/sprite.svg#icon__edit'></use>
          </svg>
        </div>
      </div>
      <div className={backClassName} onClick={clickSide('definition')}>
        <div className='game__term-container '>
          <ContentEditable html={term} disabled={true} className='game__term' />
        </div>
        <Speaker
          _id={_id}
          text={term}
          type={'term'}
          className='game__speaker-flashcards'
        />
        <div className='game__edit' onClick={clickEdit}>
          <svg width='21' height='21'>
            <use href='../img/sprite.svg#icon__edit'></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { set_flashcards_side, set_card_edit })(
  Card
);
