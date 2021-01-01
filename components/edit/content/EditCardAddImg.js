import { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  set_gallery_search,
  set_card_imgurl,
  edit_card,
} from '../../../store/actions/editActions';

const EditCardAddImg = ({
  data,
  set_gallery_search,
  set_card_imgurl,
  edit_card,
}) => {
  const { _id, imgurl, gallery } = data;

  const clickImgSearch = (e) => {
    if (imgurl && e.target !== addImgEl.current) return;
    set_gallery_search(_id, !gallery.search);
  };

  const clickImgDelete = (e) => {
    set_card_imgurl(_id, '');
    edit_card(_id);
  };

  const addImgEl = useRef(false);

  return (
    <div
      className='edit__addimg'
      style={{
        backgroundImage: `url(${imgurl})`,
      }}
      onClick={clickImgSearch}
      ref={addImgEl}
      data-imgurl={imgurl ? true : false}
    >
      <div className='edit__img-logo'>
        <svg>
          <use href='../img/sprite.svg#icon__img'></use>
        </svg>
      </div>
      <div className='edit__img-delete' onClick={clickImgDelete}>
        <svg>
          <use href='../img/sprite.svg#icon__delete'></use>
        </svg>
      </div>
      <span>IMAGE</span>
    </div>
  );
};

EditCardAddImg.propTypes = {
  data: PropTypes.object.isRequired,
  set_gallery_search: PropTypes.func.isRequired,
  set_card_imgurl: PropTypes.func.isRequired,
  edit_card: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(false, {
  set_gallery_search,
  set_card_imgurl,
  edit_card,
})(EditCardAddImg);
