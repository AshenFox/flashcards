import { connect } from 'react-redux';
import {
  set_url_ok,
  set_card_imgurl,
  edit_card,
} from '../../../store/actions/editActions';
import PropTypes from 'prop-types';

const GalleryItem = ({
  _id,
  index,
  data,
  set_url_ok,
  set_card_imgurl,
  edit_card,
}) => {
  const { url, ok } = data;

  const error = () => set_url_ok(_id, index, false);
  const load = () => set_url_ok(_id, index, true);

  const clickGalleryItem = () => {
    set_card_imgurl(_id, url);
    edit_card(_id);
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

GalleryItem.propTypes = {
  _id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  set_url_ok: PropTypes.func.isRequired,
  set_card_imgurl: PropTypes.func.isRequired,
  edit_card: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(false, {
  set_url_ok,
  set_card_imgurl,
  edit_card,
})(GalleryItem);
