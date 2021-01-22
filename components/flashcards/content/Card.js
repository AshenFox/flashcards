import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_flashcards_side } from '../../../store/actions/gameActions';
import { set_card_edit } from '../../../store/actions/editActions';
import ContentEditable from 'react-contenteditable';
import Speaker from '../../main/Speaker';
import Img from '../../main/Img';
import SRIndicator from '../../main/SRIngicator';

const Card = ({
  data,
  side = 'definition',
  position = false,
  set_flashcards_side,
  set_card_edit,
}) => {
  const router = useRouter();
  const { _id: _id_param } = router.query;

  const isSR = _id_param === 'sr';

  const { _id, term, defenition, imgurl } = data;

  const frontClassName = `game__card-front ${position ? `transparent ${position}` : ''} ${
    side === 'definition' ? '' : 'rearside'
  }`;
  const backClassName = `game__card-back ${position ? `transparent ${position}` : ''} ${
    position ? position : ''
  } ${side === 'term' ? '' : 'rearside'}`;

  const clickSide = (value) => (e) => {
    if (e.target.closest('.game__speaker-flashcards')) return;
    if (e.target.closest('.game__edit')) return;
    if (e.target.closest('.sr-indicator')) return;

    set_flashcards_side(value);
  };

  const clickEdit = () => set_card_edit(_id, true);

  return (
    <div className='game__card'>
      <div className={frontClassName} onClick={clickSide('term')}>
        <Img
          containerClass={`game__img-container ${defenition ? '' : 'full'}`}
          imgClass={'game__img'}
          url={imgurl}
        />
        {isSR && <SRIndicator data={data} classStr={'sr-indicator--flashcards'} />}

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
        {isSR && <SRIndicator data={data} classStr={'sr-indicator--flashcards'} />}
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

Card.propTypes = {
  data: PropTypes.object.isRequired,
  set_flashcards_side: PropTypes.func.isRequired,
  set_card_edit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { set_flashcards_side, set_card_edit })(Card);
