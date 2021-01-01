import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { move_gallery } from '../../../store/actions/editActions';

const GalleryControl = ({ main, direction, _id, move_gallery }) => {
  const { cards } = main;
  const card = cards[_id];
  const {
    gallery: { position, width },
  } = card;

  const clickControl = (e) => {
    if (active) move_gallery(_id, direction);
  };

  let active = true;

  if (direction === 'left') {
    if (Math.abs(position) <= 0) active = false;
  }

  if (direction === 'right') {
    const innerWidth = window.innerWidth;
    let windowWidth = 0;

    if (innerWidth < 600) windowWidth = 17;
    if (innerWidth > 600) windowWidth = 34;
    if (innerWidth > 800) windowWidth = 51;
    if (innerWidth > 1000) windowWidth = 68;

    const sum = Math.abs(position) + windowWidth;

    if (sum >= width) active = false;
  }

  return (
    <div
      className={`edit__gallery-control--${direction}`}
      data-control_el='true'
      data-active={active}
      onClick={clickControl}
    >
      <button
        className={`btn pad15 bcc-white brr50p d-f h-bcc-yellow p-r ${
          direction === 'left' ? 'mar-left-a' : ''
        }`}
      >
        <svg>
          <use href={`../img/sprite.svg#icon__triangle_${direction}`}></use>
        </svg>
      </button>
    </div>
  );
};

GalleryControl.propTypes = {
  main: PropTypes.object.isRequired,
  direction: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  move_gallery: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, {
  move_gallery,
})(GalleryControl);
