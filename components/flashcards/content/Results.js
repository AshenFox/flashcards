import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResultsItem from './ResultsItem';
import Link from 'next/link';

const Finish = ({ game }) => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === 'sr';

  const {
    flashcards: { answers },
  } = game;

  const keyDownFinish = (e) => {
    if (e.key === 'Enter') {
      router.replace(isSR ? `/home/sr` : `/module/${_id}`);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyDownFinish);

    return () => {
      window.removeEventListener('keydown', keyDownFinish);
    };
  }, []);

  const correctNum = answers.filter((item) => item.answer === 'correct').length;

  return (
    <div className='game__finish'>
      <div className='game__finish-header'>
        <div className='game__finish-header-item'>
          <h1 className='game__finish-title'>Results</h1>
          <h3 className='game__finish-round-stats'>
            {correctNum}/{answers.length} -{' '}
            {Math.round((correctNum / answers.length) * 100)}%
          </h3>
        </div>
        <div className='game__finish-header-item '>
          {' '}
          <Link href={isSR ? `/home/sr` : `/module/${_id}`}>
            <button className='btn bcc-lightblue pad10-30 brr15 white fz15 fw-normal h-grey h-bcc-yellow'>
              Finish game
            </button>
          </Link>
        </div>
      </div>

      <div className='game__finish-body'>
        {answers.map((data, i) => (
          <ResultsItem data={data} i={i + 1} key={data.id} />
        ))}
      </div>
    </div>
  );
};

Finish.propTypes = {
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(Finish);

/* 
<div className='game__finish-body-item'>
          <div className='game__finish-body-left'>
            <div className='game__finish-icon game__finish-icon--correct'>
              <svg height='22' width='22'>
                <use href='../img/sprite.svg#icon__tick'></use>
              </svg>
            </div>
            <div className='game__finish-term game__finish-term--correct'>
              <span>2.</span>
              <span>promiscuous</span>
            </div>
          </div>

          <div className='game__finish-body-right'>
            <div className='game__finish-definition'>
              <p>
                I suppose I was quite ... in my youth. (&nbsp;(of a person)
                having a lot of different sexual partners or sexual
                relationships, or (of sexual habits) involving a lot of
                different partners )
              </p>
              <div
                className='game__finish-img '
                style={{
                  backgroundImage:
                    'url(https://i.ytimg.com/vi/0J3vgcE5i2o/maxresdefault.jpg)',
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className='game__finish-body-item'>
          <div className='game__finish-body-left'>
            <div className='game__finish-icon game__finish-icon--correct'>
              <svg height='22' width='22'>
                <use href='../img/sprite.svg#icon__tick'></use>
              </svg>
            </div>
            <div className='game__finish-term game__finish-term--correct'>
              <span>3.</span>
              <span>dissension</span>
            </div>
          </div>

          <div className='game__finish-body-right'>
            <div className='game__finish-definition'>
              <p>
                I figured I could sow some ... and get a few ties and
                sweaters.&nbsp;There are signs of ... within the ruling
                political party. (&nbsp;arguments and disagreement, especially
                in an organization, group, political party, etc. )
              </p>
              <div
                className='game__finish-img '
                style={{
                  backgroundImage:
                    'url(https://i1.wp.com/leading2leadership.com/wp-content/uploads/2015/04/collaboration.png?fit=700%2C449&amp;ssl=1)',
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className='game__finish-body-item'>
          <div className='game__finish-body-left'>
            <div className='game__finish-icon game__finish-icon--incorrect'>
              <svg height='22' width='22'>
                <use href='../img/sprite.svg#icon__close'></use>
              </svg>
            </div>
            <div className='game__finish-term game__finish-term--incorrect'>
              <span>4.</span>
              <span>to hold down</span>
            </div>
          </div>

          <div className='game__finish-body-right'>
            <div className='game__finish-definition'>
              <p>
                But if it doesn't work you have to ... the kid ... . She proved
                that being a woman wouldn’t hold her down. ( to prevent
                something from developing, or to prevent someone from doing what
                they want )
              </p>
              <div
                className='game__finish-img '
                style={{
                  backgroundImage:
                    'url(http://stronghandtools.com/stronghandtools/wp-content/uploads/2017/05/holddown_app2.jpg)',
                }}
              ></div>
            </div>
          </div>
        </div>

*/
