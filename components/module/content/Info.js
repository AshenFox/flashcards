import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  change_modal,
  toggle_modal,
} from '../../../store/actions/modalActions';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import ModuleQuestion from './ModuleQuestion';
import ModuleSRDropControl from './ModuleSRDropControl';
import ModuleSRControl from './ModuleSRControl';
import DateStr from '../../main/DateSrt';

const Info = ({ main, change_modal, toggle_modal }) => {
  const { module } = main;
  const {
    module: { author, _id, creation_date },
  } = main;

  const openModal = (value) => (e) => {
    change_modal(value);
    toggle_modal();
  };

  return (
    <div className='module__info'>
      <div className='module__author'>
        <span className='module__author-created'>
          Created <DateStr date={creation_date} /> by
        </span>
        <span className='module__author-nickname'>
          {module ? author : <Skeleton width={100} />}
        </span>
      </div>

      <div className='module__nav'>
        <ModuleQuestion />
        <ModuleSRDropControl />
        <ModuleSRControl />
        <Link href={`/edit/${_id}`}>
          <div className='module__nav-item'>
            <svg width='25' height='25'>
              <use href='../img/sprite.svg#icon__edit'></use>
            </svg>
          </div>
        </Link>
        <div
          className='module__nav-item'
          onClick={openModal('delete')}
        >
          <svg width='25' height='25'>
            <use href='../img/sprite.svg#icon__delete'></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

Info.propTypes = {
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
  change_modal: PropTypes.func.isRequired,
  toggle_modal: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, {
  change_modal,
  toggle_modal,
})(Info);
