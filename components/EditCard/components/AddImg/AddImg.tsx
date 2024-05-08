import { useActions } from "@store/hooks";
import { Card } from "@store/reducers/main/mainInitState";
import { DeleteIcon, ImgIcon } from "@ui/Icons";
import Img from "@ui/Img";
import { memo, MouseEvent, useCallback, useRef } from "react";

import s from "./styles.module.scss";

type AddImgProps = {
  data: Card;
};

const AddImg = ({ data }: AddImgProps) => {
  const { set_gallery_search, set_card_imgurl, edit_card } = useActions();

  const { _id, imgurl, gallery } = data || {};

  const clickImgSearch = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (imgurl && e.target === deleteEl.current) return;
      set_gallery_search(_id, !gallery.search);
    },
    [_id, gallery.search, imgurl, set_gallery_search],
  );

  const clickImgDelete = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      set_card_imgurl(_id, "");
      edit_card(_id);
    },
    [_id, edit_card, set_card_imgurl],
  );

  const deleteEl = useRef<HTMLDivElement>(null);

  return (
    <div className={s.add_img} onClick={clickImgSearch} data-imgurl={!!imgurl}>
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
