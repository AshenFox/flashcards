import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { create_module } from '../../../store/actions/editActions';
import Link from 'next/link';

const Save = ({ main, create_module }) => {
  const {
    module: { _id, draft, title },
    cards,
  } = main;

  const clickSave = () => {
    if (active) create_module();
  };

  const cardsArr = Object.values(cards);

  let twoSaved = false;
  let counter = 0;

  for (const card of cardsArr) {
    if (card.save === true) {
      ++counter;
      if (counter >= 2) {
        twoSaved = true;
        break;
      }
    }
  }

  const active = !!(twoSaved && title);

  let btn = (
    <button
      className={`btn bcc-lightblue pad30-70 brr10 white fz20 fw-bold h-grey h-bcc-yellow ${
        active || !draft ? '' : 'inactive'
      }`}
      type='button'
      {...(draft ? { onClick: clickSave } : {})}
    >
      {draft ? 'Save' : 'Return'}
    </button>
  );

  if (!draft) btn = <Link href={`/module/${_id}`}>{btn}</Link>;

  return (
    <div className='edit__save'>
      <div className='container'>
        <div className='edit__save-module'>{btn}</div>
      </div>
    </div>
  );
};

Save.propTypes = {
  main: PropTypes.object.isRequired,
  create_module: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, { create_module })(Save);
