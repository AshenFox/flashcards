import { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { control_card, edit_card } from '../../../store/actions/editActions';
import ContentEditable from 'react-contenteditable';
import Gallery from './Gallery';
import Scrape from './Scrape';
import EditCardSave from './EditCardSave';
import EditCardClose from './EditCardClose';
import EditCardDelete from './EditCardDelete';
import EditCardAddImg from './EditCardAddImg';

const EditCard = ({
  data,
  loading,
  draft = false,
  index = false,
  toggle = false,
  game = false,
  number,
  control_card,
  edit_card,
}) => {
  const { _id, term, defenition, gallery } = data;

  const handleCardChange = (type) => (e) => {
    control_card(_id, type, e.target.value);
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      edit_card(_id);
      timer.current = false;
    }, 500);
  };

  const timer = useRef(false);

  const deleteActive = number > 2;

  return (
    <div className={`edit__cards-card ${game ? 'edit__cards-card--game' : ''}`}>
      <div className='edit__cards-header'>
        <div className='edit__cards-number'>{index && index}</div>
        {draft && <EditCardSave data={data} />}
        {toggle ? (
          <EditCardClose data={data} />
        ) : (
          <EditCardDelete data={data} active={deleteActive} />
        )}
      </div>

      <div className='edit__cards-items'>
        <div className='edit__cards-term'>
          <ContentEditable
            html={term}
            disabled={loading}
            className='textarea'
            onChange={handleCardChange('term')}
          />
          <div className='edit__cards-label'>TERM</div>
        </div>

        <div className='edit__cards-definition'>
          <div className='edit__cards-definition-input'>
            <ContentEditable
              html={defenition}
              disabled={loading}
              className='textarea'
              onChange={handleCardChange('defenition')}
            />
            <div className='edit__cards-label' htmlFor='cards__definition-input1'>
              DEFINITION
            </div>
          </div>
          <EditCardAddImg data={data} />
        </div>
      </div>
      <Scrape data={data} />
      <Gallery data={data} active={gallery.search} game={game} />
    </div>
  );
};

EditCard.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number,
  toggle: PropTypes.bool,
  number: PropTypes.number,
  control_card: PropTypes.func.isRequired,
  edit_card: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(false, {
  control_card,
  edit_card,
})(EditCard);
