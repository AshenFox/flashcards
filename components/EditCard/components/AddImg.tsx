import { MouseEvent, memo, useRef } from 'react';
import Img from '../../main/Img';
import { Card } from '@store/reducers/main/mainInitState';
import { useActions } from '@store/hooks';
import s from '../styles.module.scss';

type AddImgProps = {
  data: Card;
};

const AddImg = ({ data }: AddImgProps) => {
  const { set_gallery_search, set_card_imgurl, edit_card } = useActions();

  const { _id, imgurl, gallery } = data || {};

  const clickImgSearch = (e: MouseEvent<HTMLDivElement>) => {
    if (imgurl && e.target === deleteEl.current) return;
    set_gallery_search(_id, !gallery.search);
  };

  const clickImgDelete = (e: MouseEvent<HTMLDivElement>) => {
    set_card_imgurl(_id, '');
    edit_card(_id);
  };

  const deleteEl = useRef<HTMLDivElement>(null);

  return (
    <div className={s.img} onClick={clickImgSearch} data-imgurl={!!imgurl}>
      <Img containerClass={s.img_container} imgClass={s.img_element} url={imgurl} />
      <div className={s.img_logo}>
        <svg>
          <use href='../img/sprite.svg#icon__img'></use>
        </svg>
      </div>
      <div className={s.img_delete} onClick={clickImgDelete} ref={deleteEl}>
        <svg>
          <use href='../img/sprite.svg#icon__delete'></use>
        </svg>
      </div>
      <span>IMAGE</span>
    </div>
  );
};

export default memo(AddImg);
