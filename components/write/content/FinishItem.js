import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import Img from '../../main/Img';

const FinishItem = ({ main, data, i }) => {
  const { cards } = main;

  const { term, defenition, imgurl } = cards[data.id];

  return (
    <div className='game__finish-body-item'>
      <div className='game__finish-body-left'>
        <div className={`game__finish-icon game__finish-icon--${data.answer}`}>
          <svg height='22' width='22'>
            <use
              href={`../img/sprite.svg#icon__${
                data.answer === 'correct' ? 'tick' : 'close'
              }`}
            ></use>
          </svg>
        </div>
        <div className={`game__finish-term game__finish-term--${data.answer}`}>
          <span>{i}.</span>
          <ContentEditable html={term} disabled={true} />
        </div>
      </div>

      <div className='game__finish-body-right'>
        <div className='game__finish-definition'>
          <ContentEditable html={defenition} disabled={true} />
          {/* <div
            className='game__finish-img '
            style={{
              backgroundImage: `url(${imgurl})`,
            }}
          ></div> */}

          <Img
            containerClass={'game__finish-img-container'}
            imgClass={'game__finish-img'}
            url={imgurl}
          />
        </div>
      </div>
    </div>
  );
};

FinishItem.propTypes = {
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps)(FinishItem);
