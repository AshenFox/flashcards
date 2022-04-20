import {
  set_url_ok,
  set_card_imgurl,
  edit_card,
} from '../../../store/actions/editActions';
import { ImgurlObj } from '../../../store/reducers/main/mainInitState';
import { FC, SyntheticEvent } from 'react';
import { useAppDispatch } from '../../../store/store';

interface OwnProps {
  _id: string;
  index: string;
  data: ImgurlObj;
}

type Props = OwnProps;

const GalleryItem: FC<Props> = ({ _id, index, data }) => {
  const dispatch = useAppDispatch();

  const { url, ok } = data;

  const error = (e: SyntheticEvent<HTMLImageElement>) =>
    dispatch(set_url_ok(_id, index, false));
  const load = (e: SyntheticEvent<HTMLImageElement>) =>
    dispatch(set_url_ok(_id, index, true));

  const clickGalleryItem = () => {
    dispatch(set_card_imgurl(_id, url));
    dispatch(edit_card(_id));
  };

  return (
    <figcaption
      className={`edit__gallery-item ${ok ? '' : 'hidden'}`}
      onClick={clickGalleryItem}
    >
      <img src={url} alt='Gallery img' onLoad={load} onError={error} />
    </figcaption>
  );
};

export default GalleryItem;
