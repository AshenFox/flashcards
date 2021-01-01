import PropTypes from 'prop-types';

const Question = (props) => {
  return (
    <div className='game__question'>
      <div className='game__question-dontknow'>
        <span>Don't know</span>
      </div>
      <div
        className='game__question-img '
        style={{
          backgroundImage:
            'url(http://www.5forty.news/wp-content/uploads/2020/02/season-3-of-the-boss-baby-back-in-business-is-hitting-netflix-in-march-see-the-first-trailer.jpg)',
        }}
      ></div>
      <div className='game__question-definition'>
        <p>
          Perkins may have been innocent, but he was still Mazlo's ... .<br />
          <br />
        </p>
        <div>She has a dozen ... , but manages many more people.</div>
        <br />
        <div>
          ( an employee whose position at work is directly below that of another
          person, and who is managed by that person: )<span>( noun )</span>
        </div>
        <p></p>
        <div className='game__speaker-write' data-active='true'>
          <svg height='22' width='22'>
            <use href='../img/sprite.svg#icon__speaker'></use>
          </svg>
        </div>
      </div>
      <form action='' className='game__form' autoComplete='off'>
        <fieldset className='game__form-fieldset'>
          <div className='game__form-input'>
            <input type='text' id='write-input' autoComplete='off' />
          </div>

          <label htmlFor='write-input'>type the answer</label>
        </fieldset>
        <div className='game__form-btn-container'>
          <button className='btn bcc-lightblue pad10-30 brr5 white fz15 fw-normal h-grey h-bcc-yellow'>
            Answer
          </button>
        </div>
      </form>
    </div>
  );
};

Question.propTypes = {};

export default Question;

/* 

<div class="game__question-dontknow">
          <span>Don't know</span>
        </div>
        <div class="game__question-img ${
          imgurl === '' ? 'hidden' : ''
        }" style="background-image: url(${imgurl !== '' ? imgurl : ''});"></div>
        <div class="game__question-defenition">
          <p>${defenition}</p>
          <div class="game__speaker-write" data-active="${
            voice.working &&
            defenition !== '' &&
            voice.detectLanguage(defenition)
              ? 'true'
              : 'false'
          }">
            <svg height="22" width="22">
              <use href="../img/sprite.svg#icon__speaker"></use>
            </svg>
          </div>
        </div>
        <form action="" class="game__form" autocomplete="off">
          <fieldset class="game__form-fieldset">
            <div class="game__form-input">
              <input type="text" id="write-input" autocomplete="off"/>
            </div>
            
            <label htmlFor="write-input">type the answer</label>
          </fieldset>
          <div class="game__form-btn-container">
            <button class="btn bcc-lightblue pad10-30 brr5 white fz15 fw-normal h-grey h-bcc-yellow">Answer</button>
          </div>
        </form>

*/
