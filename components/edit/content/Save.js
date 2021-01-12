import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { create_module } from '../../../store/actions/editActions';
import Link from 'next/link';
import LoadingButton from '../../main/LoadingButton';

const Save = ({ main, create_module }) => {
  const {
    module: { _id, draft, title, module_loading },
    cards,
  } = main;
  const router = useRouter();

  const clickSave = () => {
    if (active) create_module();
  };

  const clickLink = () => {
    router.replace(`/module/${_id}`);
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
    <LoadingButton
      active={active || !draft ? true : false}
      loading={module_loading}
      onClickHandler={draft ? clickSave : clickLink}
      classStr='btn bcc-lightblue pad30-70 brr15 white fz20 fw-bold h-grey h-bcc-yellow'
    >
      {draft ? 'Save' : 'Return'}
    </LoadingButton>
  );

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
