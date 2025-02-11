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
  const { setCardImgurl, setUrlOk, editCard } = useActions();

  const { url, ok } = data;

  const error = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => setUrlOk(_id, index, false),
    [_id, index, setUrlOk],
  );
  const load = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => setUrlOk(_id, index, true),
    [_id, index, setUrlOk],
  );

  const clickGalleryItem = () => {
    setCardImgurl({ _id, value: url });
    editCard(_id);
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
