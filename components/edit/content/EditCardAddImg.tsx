import { FC, MouseEvent, useRef } from 'react';
import Img from '../../main/Img';
import { Card } from '../../../store/reducers/main/mainInitState';
import { useActions } from '../../../store/hooks';

interface OwnProps {
  data: Card;
}

type Props = OwnProps;

const EditCardAddImg: FC<Props> = ({ data }) => {
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
    <div className='edit__addimg' onClick={clickImgSearch} data-imgurl={!!imgurl}>
      <Img containerClass={'edit__img-container'} imgClass={'edit__img'} url={imgurl} />
      <div className='edit__img-logo'>
        <svg>
          <use href='../img/sprite.svg#icon__img'></use>
        </svg>
      </div>
      <div className='edit__img-delete' onClick={clickImgDelete} ref={deleteEl}>
        <svg>
          <use href='../img/sprite.svg#icon__delete'></use>
        </svg>
      </div>
      <span>IMAGE</span>
    </div>
  );
};

export default EditCardAddImg;
