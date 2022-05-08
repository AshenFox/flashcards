import { useState, useEffect, FC, ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import GalleryContainer from './GalleryContainer';
import GalleryError from './GalleryError';
import GallerySpinner from './GallerySpinner';
import { Card } from '../../../store/reducers/main/mainInitState';
import { useActions } from '../../../store/hooks';

interface OwnProps {
  data: Card;
  active: boolean;
  game?: boolean;
}

type Props = OwnProps;

const Gallery: FC<Props> = ({ data, active, game = false }) => {
  const { control_gallery_query, search_images, reset_gallery_fields } = useActions();

  const { _id, gallery } = data || {};
  const { loading, query, error } = gallery;

  const [uPressed, setUPressed] = useState(false);
  const [altPressed, setAltPressed] = useState(false);

  const addUrlFlag = () => control_gallery_query(_id, '@url - ' + query);

  useEffect(() => {
    if (uPressed && altPressed) addUrlFlag();
  }, [uPressed, altPressed]);

  const changeImgSearchbar = (e: ChangeEvent<HTMLInputElement>) =>
    control_gallery_query(_id, e.target.value);

  const keyDownImgSearchbar = (e: KeyboardEvent<HTMLInputElement>) => {
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

  const clickImgSearchbar = (e: MouseEvent<HTMLDivElement>) => {
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

export default Gallery;
