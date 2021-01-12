import PropTypes from 'prop-types';
import Link from 'next/link';
import ContentEditable from 'react-contenteditable';
import DateStr from '../../main/DateSrt';

const Module = ({ data, filter = false }) => {
  const { title, author, number, draft, _id, creation_date } = data
    ? data
    : {};

  const filterRegExp = new RegExp(
    `(${filter})(?![^<]*>|[^<>]*<\/)`,
    'g'
  );
  const replacement = `<span class='bcc-yellow'>${filter}</span>`;

  let formatted_title;

  if (filter)
    formatted_title = title.replace(filterRegExp, replacement);

  let html;
  if (filter) html = formatted_title;
  if (!draft && !filter) html = title;
  if (!title) html = '(Untitled)';
  if (draft) html = '(Draft)';

  return (
    <Link href={draft ? `/edit/draft` : `/module/${_id}`}>
      <div className='home__module'>
        <div className='home__module-header'>
          <div className='home__module-created'>
            <span>
              Created <DateStr date={creation_date} />
            </span>
          </div>
        </div>
        <div className='home__module-main'>
          <div className='home__module-info'>
            <div className='home__term-number'>{number} Terms</div>
            {!draft && (
              <div className='home__module-author'>{author}</div>
            )}
          </div>
          <ContentEditable
            html={html}
            disabled={true}
            className={`home__module-title ${
              draft || !title ? 'blue' : ''
            }`}
          />
        </div>
      </div>
    </Link>
  );
};

Module.propTypes = {
  data: PropTypes.object.isRequired,
  filter: PropTypes.string,
};

export default Module;
