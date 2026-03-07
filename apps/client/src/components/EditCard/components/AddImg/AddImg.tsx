import type { CardDto } from "@flashcards/common";
import {
  useCardsUIStore,
  useEditCard,
  useSetCardImgurl,
  useSetGallerySearch,
} from "@zustand/cards";
import { DeleteIcon, ImgIcon } from "@ui/Icons";
import Img from "@ui/Img";
import clsx from "clsx";
import { memo, MouseEvent, useCallback, useRef } from "react";

import s from "./styles.module.scss";

type AddImgProps = {
  data: CardDto;
};

const AddImg = ({ data }: AddImgProps) => {
  const setGallerySearch = useSetGallerySearch();
  const setCardImgurl = useSetCardImgurl();
  const editCard = useEditCard();

  const search = useCardsUIStore(s => s.cards[data._id]?.gallery.search);

  const { _id, imgurl } = data || {};

  const clickImgSearch = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (imgurl && deleteEl.current?.contains(e.target as Node)) return;
      setGallerySearch({ _id, value: !search });
    },
    [_id, search, imgurl, setGallerySearch],
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
