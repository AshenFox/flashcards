import { useActions } from "@store/hooks";
import { Card } from "@store/reducers/main/types";
import { DeleteIcon, ImgIcon } from "@ui/Icons";
import Img from "@ui/Img";
import clsx from "clsx";
import { memo, MouseEvent, useCallback, useRef } from "react";

import s from "./styles.module.scss";

type AddImgProps = {
  data: Card;
};

const AddImg = ({ data }: AddImgProps) => {
  const { setGallerySearch, setCardImgurl, editCard } = useActions();

  const { _id, imgurl, gallery } = data || {};

  const clickImgSearch = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (imgurl && deleteEl.current?.contains(e.target as Node)) return;
      setGallerySearch({ _id, value: !gallery.search });
    },
    [_id, gallery.search, imgurl, setGallerySearch],
  );

  const clickImgDelete = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      setCardImgurl({ _id, value: "" });
      editCard(_id);
    },
    [_id, editCard, setCardImgurl],
  );

  const deleteEl = useRef<HTMLDivElement>(null);

  return (
    <div
      className={clsx(s.add_img, {
        [s.empty]: !imgurl,
      })}
      onClick={clickImgSearch}
    >
      <Img containerClass={s.container} imgClass={s.img} url={imgurl} />
      <div className={s.logo}>
        <ImgIcon />
      </div>
      <div className={s.delete} onClick={clickImgDelete} ref={deleteEl}>
        <DeleteIcon />
      </div>
      <span>IMAGE</span>
    </div>
  );
};

export default memo(AddImg);
