import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const EndGame = ({ main, active }) => {
  const { cards } = main;

  const cardsArr = Object.values(cards);

  return (
    <div className='game__card'>
      <div
        className={`game__card-front unturnable ${
          !active ? 'next transparent' : ''
        }`}
      >
        <h1 className='game__card-message'>Nice work!</h1>
        <p className='game__card-message-info'>{`You've just studied ${
          cardsArr.length
        } term${cardsArr.length > 1 ? 's' : ''}!`}</p>
        <button className='btn bcc-lightblue pad30 brr5 white fz175 h-grey h-bcc-yellow width50'>
          Finish up
        </button>
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
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, {})(EndGame);
