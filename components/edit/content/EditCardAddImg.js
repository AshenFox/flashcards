import { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  set_gallery_search,
  set_card_imgurl,
  edit_card,
} from '../../../store/actions/editActions';
import Img from '../../main/Img';

const EditCardAddImg = ({
  data,
  set_gallery_search,
  set_card_imgurl,
  edit_card,
}) => {
  const { _id, imgurl, gallery } = data;

  const clickImgSearch = (e) => {
    if (imgurl && e.target === deleteEl.current) return;
    set_gallery_search(_id, !gallery.search);
  };

  const clickImgDelete = (e) => {
    set_card_imgurl(_id, '');
    edit_card(_id);
  };

  const deleteEl = useRef(false);

  return (
    <div
      className='edit__addimg'
      onClick={clickImgSearch}
      data-imgurl={imgurl ? true : false}
    >
      <Img
        containerClass={'edit__img-container'}
        imgClass={'edit__img'}
        url={imgurl}
      />
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
