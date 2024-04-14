import Link from 'next/link';
import DateStr from '@ui/DateStr';
import { Module as ModuleType } from '../../../store/reducers/main/mainInitState';
import { FC } from 'react';
import { usePlug } from '@helpers/hooks/usePlug';
import TextArea from '@ui/TextArea';

interface OwnProps {
  data: ModuleType;
  filter?: string;
}

type Props = OwnProps;

const Module: FC<Props> = ({ data, filter = null }) => {
  const { title, author, number, draft, _id, creation_date } = data || {};

  const filterRegExp = new RegExp(
    `${filter}(?!br>|r>|>|\/div>|div>|iv>|v>|nbsp;|bsp;|sp;|p;|;|\/span>|span>|pan>|an>|n>)`,
    'g'
  );

  const replacement = `<span class='bcc-yellow'>${filter}</span>`;

  let formatted_title: string;

  if (filter) formatted_title = title.replace(filterRegExp, replacement);

  let html: string;

  if (filter) html = formatted_title;
  if (!draft && !filter) html = title;
  if (!title) html = '(Untitled)';
  if (draft) html = '(Draft)';

  const [visible, ref, Plug] = usePlug('home__module');

  return (
    <Link href={draft ? `/edit/draft` : `/module/${_id}`}>
      {visible ? (
        <div className='home__module' ref={ref}>
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
              {!draft && <div className='home__module-author'>{author}</div>}
            </div>
            <TextArea
              html={html}
              className={`home__module-title ${draft || !title ? 'blue' : ''}`}
            />
          </div>
        </div>
      ) : (
        Plug
      )}
    </Link>
  );
};

export default Module;
