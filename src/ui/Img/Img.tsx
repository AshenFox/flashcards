import { BrokenImageIcon } from "@ui/Icons";
import clsx from "clsx";
import { memo, SyntheticEvent, useCallback } from "react";
import { useRef, useState } from "react";

import s from "./styles.module.scss";

type ImgProps = {
  containerClass?: string;
  imgClass?: string;
  url: string;
  isHideOnLoading?: boolean;
};

const Img = ({
  containerClass = "",
  imgClass = "",
  url,
  isHideOnLoading = true,
}: ImgProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const urlMemo = useRef(url);

  if (urlMemo.current !== url) {
    setError(false);
    setLoaded(false);
    urlMemo.current = url;
  }

  const onError = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => setError(true),
    [],
  );
  const onLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => setLoaded(true),
    [],
  );

  return (
    <div
      className={clsx(
        containerClass,
        s.container,
        !error || (loaded && isHideOnLoading) ? "" : s.not_loaded,
        error && s.error,
      )}
    >
      {url && !error && (
        <img
          className={clsx(s.img, imgClass)}
          src={url}
          onLoad={onLoad}
          onError={onError}
          alt=""
        />
      )}

      {error && (
        <div className={s.error}>
          <BrokenImageIcon />
        </div>
      )}
    </div>
  );
};

export default memo(Img);
