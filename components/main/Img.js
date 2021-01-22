import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const Img = ({ containerClass = '', imgClass = '', url }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const urlMemo = useRef(url);

  if (urlMemo.current !== url) {
    setError(false);
    setLoaded(false);
    urlMemo.current = url;
  }

  const onError = () => setError(true);
  const onLoad = () => setLoaded(true);

  return (
    <div
      className={`${containerClass} img__container ${
        loaded || error ? '' : 'img__container--not-loaded'
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

Img.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Img;
