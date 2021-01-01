import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set_card_edit } from '../../../store/actions/editActions';
import ContentEditable from 'react-contenteditable';
import Speaker from '../../main/Speaker';
import CardEditControl from './CardEditControl';
import CardQuestion from './CardQuestion';
import CardSRDropControl from './CardSRDropControl';
import CardSRControl from './CardSRControl';

const Card = ({ data, filter = false, filter_type = false, set_card_edit }) => {
  const {
    term = '',
    defenition = '',
    // studyRegime = false,
    imgurl = '',
    _id,
  } = data;

  const filterRegExp = new RegExp(`(${filter})(?![^<]*>|[^<>]*<\/)`, 'g');
  const replacement = `<span class='bcc-yellow'>${filter}</span>`;

  let formatted_term, formatted_definition;

  if (filter_type === 'term')
    formatted_term = term.replace(filterRegExp, replacement);
  if (filter_type === 'defenition')
    formatted_definition = defenition.replace(filterRegExp, replacement);

  return (
    <div className='module__card'>
      <div className='module__card-term'>
        <ContentEditable
          html={filter_type === 'term' && filter ? formatted_term : term}
          disabled={true}
        />
        <CardEditControl data={data} />
        <CardSRControl data={data} />
        <CardSRDropControl data={data} />
        <CardQuestion data={data} />
        <Speaker
          _id={_id}
          text={term}
          type={'term'}
          className='module__speaker'
        />
      </div>
      <div className='module__card-definition-container'>
        <div className='module__card-definition'>
          <ContentEditable
            html={
              filter_type === 'defenition' && filter
                ? formatted_definition
                : defenition
            }
            disabled={true}
          />
          <Speaker
            _id={_id}
            text={defenition}
            type={'definition'}
            className='module__speaker'
          />
        </div>
        <div className={`module__card-img-container ${imgurl ? '' : 'hidden'}`}>
          <div
            className='module__card-img'
            style={{
              backgroundImage: `url(${imgurl})`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.object.isRequired,
  filter: PropTypes.string,
  filter_type: PropTypes.string,
  set_card_edit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(false, { set_card_edit })(Card);
