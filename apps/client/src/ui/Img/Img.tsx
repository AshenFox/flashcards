import { BrokenImageIcon } from "@ui/Icons";
import Skeleton from "@ui/Skeleton";
import clsx from "clsx";
import {
  memo,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import s from "./styles.module.scss";

type ImgProps = {
  containerClass?: string;
  contentClass?: string;
  url: string;
};

const Img = ({
  containerClass = "",
  contentClass = "",
  url = "",
}: ImgProps) => {
  const trimmedUrl = useMemo(() => url.trim(), [url]);
  const hasUrl = trimmedUrl.length > 0;

  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    hasUrl ? "loading" : "error",
  );

  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setStatus(hasUrl ? "loading" : "error");
  }, [hasUrl, trimmedUrl]);

  useEffect(() => {
    if (!hasUrl) return;
    if (!imgRef.current) return;

    // If the image is already in cache, `onLoad` may have effectively happened already.
    if (!imgRef.current.complete) return;

    setStatus(imgRef.current.naturalWidth > 0 ? "loaded" : "error");
  }, [hasUrl, trimmedUrl]);

  const onError = useCallback(
    (_e: SyntheticEvent<HTMLImageElement>) => setStatus("error"),
    [],
  );
  const onLoad = useCallback(
    (_e: SyntheticEvent<HTMLImageElement>) => setStatus("loaded"),
    [],
  );

  return (
    <div className={clsx(s.container, "img__container", containerClass)}>
      <div className={clsx(s.content, "img__content", contentClass)}>
        {hasUrl && (
          <img
            ref={imgRef}
            className={clsx(s.img, status !== "loaded" && s.img_hidden)}
            src={trimmedUrl}
            onLoad={onLoad}
            onError={onError}
            decoding="async"
            loading="lazy"
            alt=""
          />
        )}

        {status === "loading" && (
          <Skeleton className={s.loading} inline={false} />
        )}

        {status === "error" && (
          <div
            className={s.error}
            role="status"
            aria-label="Image failed to load"
          >
            <BrokenImageIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Img);
