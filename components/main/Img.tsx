import { FC, SyntheticEvent } from 'react';
import { useState, useRef } from 'react';

interface OwnProps {
  containerClass?: string;
  imgClass?: string;
  url: string;
  isHideOnLoading?: boolean;
}

type Props = OwnProps;

const Img: FC<Props> = ({
  containerClass = '',
  imgClass = '',
  url,
  isHideOnLoading = true,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const urlMemo = useRef(url);

  if (urlMemo.current !== url) {
    setError(false);
    setLoaded(false);
    urlMemo.current = url;
  }

  const onError = (e: SyntheticEvent<HTMLImageElement>) => setError(true);
  const onLoad = (e: SyntheticEvent<HTMLImageElement>) => setLoaded(true);

  return (
    <div
      className={`${containerClass} img__container ${
        !error || (loaded && isHideOnLoading) ? '' : 'img__container--not-loaded' // loaded
      } ${error ? 'img__container--error' : ''}`}
    >
      {url && !error && (
        <img className={`img ${imgClass}`} src={url} onLoad={onLoad} onError={onError} />
      )}
      {error && (
        <div className='img__error'>
          <svg>
            <use href='../img/sprite.svg#icon__broken_image'></use>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Img;
