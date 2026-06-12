import { ImgurlObj, ImgurlObjs } from "@components/Gallery/types";
import clsx from "clsx";
import { CSSProperties, memo, useMemo } from "react";

import Control from "./components/Control";
import Item from "./components/Item";
import s from "./styles.module.scss";

type CarouselProps = {
  _id: string;
  imgurl_obj: ImgurlObjs;
  position: number;
  width: number;
  onMove: (direction: "left" | "right") => void;
  onImageStatusChange?: (index: string, ok: boolean) => void;
  onSelectImage?: (url: string) => void;
  isLoading?: boolean;
  isError?: boolean;
  game?: boolean;
};

const Carousel = ({
  _id,
  imgurl_obj,
  position,
  width,
  onMove,
  onImageStatusChange,
  onSelectImage,
  isLoading = false,
  isError = false,
  game = false,
}: CarouselProps) => {
  const imgurl_arr = Object.values<ImgurlObj>(imgurl_obj);

  const windowStyles: CSSProperties = useMemo(
    () => ({
      width: `${width}rem`,
      transform: `translateX(${position}rem)`,
    }),
    [position, width],
  );

  return (
    <div className={clsx(s.carousel, (isLoading || isError) && s.hide)}>
      <Control
        _id={_id}
        direction={"left"}
        galleryPosition={position}
        galleryWidth={width}
        onMove={onMove}
      />
      <div className={clsx(s.window, game && s.game)}>
        <div className={s.track} style={windowStyles}>
          {imgurl_arr.map((item, i) => {
            return (
              <Item
                key={i}
                index={`${i}`}
                data={item}
                onImageStatusChange={onImageStatusChange}
                onSelectImage={onSelectImage}
              />
            );
          })}
        </div>
      </div>
      <Control
        _id={_id}
        direction={"right"}
        galleryPosition={position}
        galleryWidth={width}
        onMove={onMove}
      />
    </div>
  );
};

export default memo(Carousel);
