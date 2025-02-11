import { useActions } from "@store/hooks";
import { ImgurlObj } from "@store/reducers/main/types";
import clsx from "clsx";
import { memo, SyntheticEvent, useCallback } from "react";

import s from "../styles.module.scss";

type ItemProps = {
  _id: string;
  index: string;
  data: ImgurlObj;
};

const Item = ({ _id, index, data }: ItemProps) => {
  const { set_url_ok, set_card_imgurl, edit_card } = useActions();

  const { url, ok } = data;

  const error = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => set_url_ok(_id, index, false),
    [_id, index, set_url_ok],
  );
  const load = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => set_url_ok(_id, index, true),
    [_id, index, set_url_ok],
  );

  const clickGalleryItem = () => {
    set_card_imgurl(_id, url);
    edit_card(_id);
  };

  return (
    <figcaption
      className={clsx(s.item, !ok && s.hidden)}
      onClick={clickGalleryItem}
    >
      <img src={url} alt="Gallery img" onLoad={load} onError={error} />
    </figcaption>
  );
};

export default memo(Item);
