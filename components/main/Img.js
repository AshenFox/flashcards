import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const Img = ({ containerClass = '', imgClass = '', url }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  /* let loaded = false;
  let error = false;
  url =
    'https://www.researchgate.net/profile/Guillaume_Bareigts/publion/331099304/figure/fig1/AS:726259839549448@1550165247683/Swap-move-two-particles-i-and-j-picked-at-random-swap-their-positions.png';
 */

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
        <img
          className={`img ${imgClass}`}
          src={url}
          onLoad={onLoad}
          onError={onError}
        />
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

Img.propTypes = {};

export default Img;
