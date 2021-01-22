import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import ContentEditable from 'react-contenteditable';
import Speaker from '../../main/Speaker';
import CardEditControl from './CardEditControl';
import CardQuestion from './CardQuestion';
import CardSRDropControl from './CardSRDropControl';
import CardSRControl from './CardSRControl';
import Img from '../../main/Img';
import DateStr from '../../main/DateSrt';

const Card = ({ data, filter = false, filter_type = false }) => {
  const router = useRouter();

  const { term = '', defenition = '', imgurl = '', _id, moduleID, creation_date } = data;

  const filterRegExp = new RegExp(`(${filter})(?![^<]*>|[^<>]*<\/)`, 'g');
  const replacement = `<span class='bcc-yellow'>${filter}</span>`;

  let formatted_term, formatted_definition;

  if (filter_type === 'term') formatted_term = term.replace(filterRegExp, replacement);
  if (filter_type === 'defenition')
    formatted_definition = defenition.replace(filterRegExp, replacement);

  const isModule = router.pathname === '/module/[_id]';

  return (
    <div className='module__card'>
      <div className='module__card-header'>
        <div className='module__card-created'>
          <span>
            Created <DateStr date={creation_date} />
          </span>
        </div>
        {!isModule && (
          <Link href={`/module/${moduleID}`}>
            <div className='module__card-link'>
              <svg>
                <use href='../img/sprite.svg#icon__external-link'></use>
              </svg>
              <span>To the card's module</span>
            </div>
          </Link>
        )}
      </div>
      <div className='module__card-main'>
        <div className='module__card-term'>
          <ContentEditable
            html={filter_type === 'term' && filter ? formatted_term : term}
            disabled={true}
          />
          <div className='module__card-controls'>
            <CardEditControl data={data} />
            <CardSRControl data={data} />
            <CardSRDropControl data={data} />
          </div>
          <CardQuestion data={data} />
          <Speaker _id={_id} text={term} type={'term'} className='module__speaker' />
        </div>
        <div className='module__card-definition-container'>
          <div className='module__card-definition'>
            <ContentEditable
              html={
                filter_type === 'defenition' && filter ? formatted_definition : defenition
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
          <Img
            containerClass={'module__card-img-container'}
            imgClass={'module__card-img'}
            url={imgurl}
          />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.object.isRequired,
  filter: PropTypes.string,
  filter_type: PropTypes.string,
};

const mapStateToProps = (state) => ({});

export default connect(false)(Card);
