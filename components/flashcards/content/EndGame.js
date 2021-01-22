import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';

const EndGame = ({ main, game, active }) => {
  const { cards } = main;
  const {
    flashcards: { progress },
  } = game;

  const router = useRouter();
  const { _id } = router.query;

  const cardsArr = Object.values(cards);
  const { length } = cardsArr;

  const isEnd = length === progress;

  const isEndRef = useRef(isEnd);
  isEndRef.current = isEnd;

  const keyDown = (e) => {
    if (e.key === 'Enter' && isEndRef.current) {
      router.replace(`/module/${_id}`);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, []);

  return (
    <div className='game__card'>
      <div className={`game__card-front unturnable ${!active ? 'next transparent' : ''}`}>
        <h1 className='game__card-message'>Nice work!</h1>
        <p className='game__card-message-info'>{`You've just studied ${length} term${
          length > 1 ? 's' : ''
        }!`}</p>
        <Link href={`/module/${_id}`}>
          <button className='btn bcc-lightblue pad30 brr15 white fz175 h-grey h-bcc-yellow width50'>
            Finish up
          </button>
        </Link>
      </div>
      <div
        className={`game__card-back unturnable rearside ${
          !active ? 'next transparent' : ''
        }`}
      ></div>
    </div>
  );
};

EndGame.propTypes = {
  active: PropTypes.bool,
  main: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
  game: state.game,
});

export default connect(mapStateToProps, {})(EndGame);
