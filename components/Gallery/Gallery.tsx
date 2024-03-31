import {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  memo,
  useCallback,
} from 'react';
import Container from './components/Container';
import Error from './components/Error';
import Spinner from './components/Spinner';
import { Card } from '@store/reducers/main/mainInitState';
import { useActions } from '@store/hooks';
import s from './styles.module.scss';
import clsx from 'clsx';

type GalleryProps = {
  data: Card;
  active: boolean;
  game?: boolean;
};

const Gallery = ({ data, active, game = false }: GalleryProps) => {
  const { control_gallery_query, search_images, reset_gallery_fields } = useActions();

  const { _id, gallery } = data || {};
  const { loading, query, error } = gallery;

  const [uPressed, setUPressed] = useState(false);
  const [altPressed, setAltPressed] = useState(false);

  const addUrlFlag = useCallback(
    () => control_gallery_query(_id, '@url - ' + query),
    [_id, control_gallery_query, query]
  );

  useEffect(() => {
    if (uPressed && altPressed) {
      addUrlFlag();
    }
  }, [uPressed, altPressed, addUrlFlag]);

  const changeImgSearchbar = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => control_gallery_query(_id, e.target.value),
    [_id, control_gallery_query]
  );

  const keyDownImgSearchbar = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
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
    },
    [_id, reset_gallery_fields, search_images]
  );

  const clickImgSearchbar = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      reset_gallery_fields(_id);
      search_images(_id);
    },
    [_id, reset_gallery_fields, search_images]
  );

  return (
    <div className={clsx(s.search_container, active && s.active)}>
      <div className={s.search}>
        <div>
          <form action='' className={s.form}>
            <label className={s.label}>
              <input
                type='text'
                className={s.input}
                placeholder='Search images...'
                onChange={changeImgSearchbar}
                onKeyDown={keyDownImgSearchbar}
                value={query}
              />
              <div className={s.icon} data-searching='false' onClick={clickImgSearchbar}>
                <svg>
                  <use href='../img/sprite.svg#icon__arrow_right'></use>
                </svg>
              </div>
            </label>
          </form>
        </div>
        <div className={s.results}>
          <Spinner active={loading} />
          <Container data={data} game={game} />
          <Error active={error} />
        </div>
      </div>
    </div>
  );
};

export default memo(Gallery);
