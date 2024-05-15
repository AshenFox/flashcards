import { useActions } from "@store/hooks";
import { Card } from "@store/reducers/main/mainInitState";
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
import { Error, LoadingSpinner } from "./components/States";
import s from "./styles.module.scss";

type GalleryProps = {
  data: Card;
  active: boolean;
  game?: boolean;
};

const Gallery = ({ data, active, game = false }: GalleryProps) => {
  const { control_gallery_query, search_images, reset_gallery_fields } =
    useActions();

  const { _id, gallery } = data || {};
  const { loading, query, error } = gallery;

  const [uPressed, setUPressed] = useState(false);
  const [altPressed, setAltPressed] = useState(false);

  const addUrlFlag = useCallback(
    () => control_gallery_query(_id, "@url - " + query),
    [_id, control_gallery_query, query],
  );

  useEffect(() => {
    if (uPressed && altPressed) {
      addUrlFlag();
    }
  }, [uPressed, altPressed, addUrlFlag]);

  const changeImgSearchbar = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      control_gallery_query(_id, e.target.value),
    [_id, control_gallery_query],
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
        reset_gallery_fields(_id);
        search_images(_id);
      }
    },
    [_id, reset_gallery_fields, search_images],
  );

  const clickImgSearchbar = useCallback(
    (e: MouseEvent<SVGSVGElement>) => {
      reset_gallery_fields(_id);
      search_images(_id);
    },
    [_id, reset_gallery_fields, search_images],
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
          <Carousel data={data} game={game} />
          <LoadingSpinner active={loading} />
          <Error active={error} />
        </div>
      </div>
    </div>
  );
};

export default memo(Gallery);
