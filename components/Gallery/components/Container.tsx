import { CSSProperties, useMemo, memo } from 'react';
import { Card } from '@store/reducers/main/mainInitState';
import s from '../styles.module.scss';
import Control from './Control';
import Item from './Item';
import clsx from 'clsx';

type ContainerProps = {
  data: Card;
  game: boolean;
};

const Container = ({ data, game = false }: ContainerProps) => {
  const { _id, gallery } = data;
  const { imgurl_obj, position, width, loading, error } = gallery;

  const imgurl_arr = Object.values(imgurl_obj);

  const windowStyles: CSSProperties = useMemo(
    () => ({
      width: `${width}rem`,
      transform: `translateX(${position}rem)`,
    }),
    [position, width]
  );

  return (
    <div className={clsx(s.gallery_container, (loading || error) && s.hide)}>
      <Control _id={_id} direction={'left'} />
      <div className={clsx(s.gallery_window, game && s.game)}>
        <div className={s.gallery} data-animated='false' style={windowStyles}>
          {imgurl_arr.map((item, i) => {
            return <Item key={i} index={`${i}`} data={item} _id={_id} />;
          })}
        </div>
      </div>
      <Control _id={_id} direction={'right'} />
    </div>
  );
};

export default memo(Container);
