import PropTypes from 'prop-types';

const Answer = (props) => {
  return (
    <div className='game__answer'>
      <h1 className='game__answer-type incorrect'>Incorrect</h1>

      <div className='game__answer-main'>
        <div className='game__answer-section '>
          <span className='game__section-title'>Definition</span>
          <div
            className='game__section-img '
            style={{
              backgroundImage:
                'url(http://www.5forty.news/wp-content/uploads/2020/02/season-3-of-the-boss-baby-back-in-business-is-hitting-netflix-in-march-see-the-first-trailer.jpg)',
            }}
          ></div>
          <div className='game__section-body '>
            <p className='game__section-text'>
              Perkins may have been innocent, but he was still Mazlo's ... .
              <br />
              <br />
            </p>
            <div>She has a dozen ... , but manages many more people.</div>
            <br />
            <div>
              ( an employee whose position at work is directly below that of
              another person, and who is managed by that person: )
              <span>( noun )</span>
            </div>
            <p></p>
            <div className='game__speaker-write' data-active='true'>
              <svg height='22' width='22'>
                <use href='../img/sprite.svg#icon__speaker'></use>
              </svg>
            </div>
          </div>
        </div>

        <div className='game__answer-section '>
          <span className='game__section-title'>You said</span>
          <div className='game__section-body'>
            <p className='game__section-text'>sdfsdf</p>
            <div className='game__override'>
              <button className='btn fz15 fw-normal lightblue h-yellow'>
                Override: I was right
              </button>
            </div>
          </div>
        </div>

        <div className='game__answer-section'>
          <span className='game__section-title'>Correct</span>
          <div className='game__section-body '>
            <p className='game__section-text'>direct report</p>
            <div className='game__speaker-write' data-active='true'>
              <svg height='22' width='22'>
                <use href='../img/sprite.svg#icon__speaker'></use>
              </svg>
            </div>
          </div>
        </div>

        <form action='' className='game__form hidden' autoComplete='off'>
          <fieldset className='game__form-fieldset'>
            <div className='game__form-input' data-correct='false'>
              <input type='text' id='write-input' autoComplete='off' />
            </div>
            <label htmlFor='write-input'>copy answer</label>
          </fieldset>
        </form>
      </div>

      <div className='game__answer-continue' data-correct='true'>
        <button className='btn bcc-lightblue pad10-30 brr5 white fz15 fw-normal h-grey h-bcc-yellow'>
          Click to continue
        </button>
      </div>
    </div>
  );
};

Answer.propTypes = {};

export default Answer;
