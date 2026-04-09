import { ArrowRightIcon } from "@ui/Icons";
import Input from "@ui/Input";
import clsx from "clsx";
import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import Carousel from "./components/Carousel";
import { Error as GalleryError, LoadingSpinner } from "./components/States";
import { useCardGallery } from "./hooks";
import s from "./styles.module.scss";

type GalleryProps = {
  _id: string;
  active: boolean;
  game?: boolean;
  onSelectImage?: (url: string) => void;
};

const Gallery = ({
  _id,
  active,
  game = false,
  onSelectImage,
}: GalleryProps) => {
  const {
    query,
    setQuery,
    isLoading,
    isError,
    error,
    position,
    width,
    imgurl_obj,
    searchImages,
    setImageOk,
    moveGallery,
  } = useCardGallery(_id);

  const [uPressed, setUPressed] = useState(false);
  const [altPressed, setAltPressed] = useState(false);

  const addUrlFlag = useCallback(
    () => setQuery(prev => "@url - " + prev),
    [setQuery],
  );

  useEffect(() => {
    if (uPressed && altPressed) {
      setUPressed(false);
      setAltPressed(false);
      addUrlFlag();
    }
  }, [uPressed, altPressed, addUrlFlag]);

  const changeImgSearchbar = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
    [setQuery],
  );

  const keyDownImgSearchbar = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const key = e.key;

      if (key === "u") {
        setUPressed(true);
        setTimeout(() => setUPressed(false), 250);
      }

      if (key === "Alt") {
        setAltPressed(true);
        setTimeout(() => setAltPressed(false), 250);
      }

      if (key === "Enter") {
        e.preventDefault();
        searchImages();
      }
    },
    [searchImages],
  );

  const clickImgSearchbar = useCallback(
    (_e: MouseEvent<SVGSVGElement>) => {
      searchImages();
    },
    [searchImages],
  );

  return (
    <div className={clsx(s.container, active && s.active)}>
      <div className={s.gallery}>
        <div>
          <form action="" className={s.form}>
            <Input
              className={s.input}
              movingBorder
              placeholder="Search images..."
              onChange={changeImgSearchbar}
              onKeyDown={keyDownImgSearchbar}
              value={query}
              after={
                <ArrowRightIcon
                  className={s.icon}
                  width={15}
                  height={15}
                  onClick={clickImgSearchbar}
                />
              }
            />
          </form>
        </div>
        <div className={s.results}>
          <Carousel
            _id={_id}
            imgurl_obj={imgurl_obj}
            position={position ?? 0}
            width={width}
            onMove={moveGallery}
            onImageStatusChange={setImageOk}
            onSelectImage={onSelectImage}
            isLoading={isLoading}
            isError={isError}
            game={game}
          />
          <LoadingSpinner active={isLoading} />
          <GalleryError isError={isError} error={error} />
        </div>
      </div>
    </div>
  );
};

export default memo(Gallery);
