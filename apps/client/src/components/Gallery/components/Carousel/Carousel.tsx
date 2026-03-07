import type { ImgurlObjs } from "@zustand/cards";
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
  loading?: boolean;
  error?: boolean;
  game?: boolean;
};

const Carousel = ({
  _id,
  imgurl_obj,
  position,
  width,
  loading = false,
  error = false,
  game = false,
}: CarouselProps) => {
  const imgurl_arr = Object.values(imgurl_obj);

  const windowStyles: CSSProperties = useMemo(
    () => ({
      width: `${width}rem`,
      transform: `translateX(${position}rem)`,
    }),
    [position, width],
  );

  return (
    <div className={clsx(s.carousel, (loading || error) && s.hide)}>
      <Control _id={_id} direction={"left"} galleryPosition={position} galleryWidth={width} />
      <div className={clsx(s.window, game && s.game)}>
        <div className={s.track} style={windowStyles}>
          {imgurl_arr.map((item, i) => {
            return <Item key={i} index={`${i}`} data={item} _id={_id} />;
          })}
        </div>
      </div>
      <Control _id={_id} direction={"right"} galleryPosition={position} galleryWidth={width} />
    </div>
  );
};

export default memo(Carousel);
