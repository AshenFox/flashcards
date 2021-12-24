import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  control_gallery_query,
  search_images,
  reset_gallery_fields,
} from '../../../store/actions/editActions';
import GalleryContainer from './GalleryContainer';
import GalleryError from './GalleryError';
import GallerySpinner from './GallerySpinner';

const Gallery = ({
  data,
  active,
  game = false,
  control_gallery_query,
  search_images,
  reset_gallery_fields,
}) => {
  const { _id, gallery } = data;
  const { loading, query, error } = gallery;

  const [uPressed, setUPressed] = useState(false);
  const [altPressed, setAltPressed] = useState(false);

  const timer = useRef(false);

  const addUrlFlag = () => control_gallery_query(_id, '@url - ' + query);

  useEffect(() => {
    if (uPressed && altPressed) addUrlFlag();
  }, [uPressed, altPressed]);

  const changeImgSearchbar = (e) => control_gallery_query(_id, e.target.value);

  const keyDownImgSearchbar = (e) => {
    const key = e.key;

    if (key === 'u') {
      setUPressed(true);
      setTimeout(() => setUPressed(false), 250);
    }

    if (key === 'Alt') {
      setAltPressed(true);
      setTimeout(() => setAltPressed(false), 250);
    }

    if (key === 'Enter') {
      e.preventDefault();
      reset_gallery_fields(_id);
      search_images(_id);
    }
  };

  const onTouchEnd = (e) => {
    // e.preventDefault();
    clearTimeout(timer.current);
  };

  const onTouchStart = (e) => {
    timer.current = setTimeout(() => {
      timer.current = false;
      addUrlFlag();
    }, 550);
  };

  const clickImgSearchbar = (e) => {
    reset_gallery_fields(_id);
    search_images(_id);
  };

  return (
    <div
      className={`edit__img-search-container ${
        active ? 'edit__img-search-container--active' : ''
      }`}
    >
      <div className='edit__img-search'>
        <div className='edit__searchbar'>
          <form action='' className='edit__searchbar-form'>
            <label className='edit__searchbar-input-label'>
              <input
                type='text'
                className='edit__searchbar-input'
                placeholder='Search images...'
                onChange={changeImgSearchbar}
                onKeyDown={keyDownImgSearchbar}
                value={query}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onBlur={onTouchEnd}
              />
              <div
                className='edit__searchbar-icon'
                data-searching='false'
                onClick={clickImgSearchbar}
              >
                <svg>
                  <use href='../img/sprite.svg#icon__arrow_right'></use>
                </svg>
              </div>
            </label>
          </form>
        </div>
        <div className='edit__search-results'>
          <GallerySpinner active={loading} />
          <GalleryContainer data={data} game={game} />
          <GalleryError active={error} />
        </div>
      </div>
    </div>
  );
};

Gallery.propTypes = {
  main: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  control_gallery_query: PropTypes.func.isRequired,
  search_images: PropTypes.func.isRequired,
  reset_gallery_fields: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, {
  control_gallery_query,
  search_images,
  reset_gallery_fields,
})(Gallery);
