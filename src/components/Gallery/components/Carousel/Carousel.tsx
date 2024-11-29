import { Card } from "@store/reducers/main/mainInitState";
import clsx from "clsx";
import { CSSProperties, memo, useMemo } from "react";

import Control from "./components/Control";
import Item from "./components/Item";
import s from "./styles.module.scss";

type CarouselProps = {
  data: Card;
  game: boolean;
};

const Carousel = ({ data, game = false }: CarouselProps) => {
  const { _id, gallery } = data;
  const { imgurl_obj, position, width, loading, error } = gallery;

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
      <Control _id={_id} direction={"left"} />
      <div className={clsx(s.window, game && s.game)}>
        <div className={s.track} style={windowStyles}>
          {imgurl_arr.map((item, i) => {
            return <Item key={i} index={`${i}`} data={item} _id={_id} />;
          })}
        </div>
      </div>
      <Control _id={_id} direction={"right"} />
    </div>
  );
};

export default memo(Carousel);
