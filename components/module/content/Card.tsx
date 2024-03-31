import { useRouter } from 'next/router';
import Link from 'next/link';
import ContentEditable from 'react-contenteditable';
import Speaker from '../../main/Speaker';
import CardEditControl from './CardEditControl';
import CardQuestion from './CardQuestion';
import CardSRDropControl from './CardSRDropControl';
import CardSRControl from './CardSRControl';
import Img from '@ui/Img';
import DateStr from '../../main/DateSrt';
import { FC } from 'react';
import { Card as CardType } from '../../../store/reducers/main/mainInitState';
import { usePlug } from '../../main/hooks';

interface OwnProps {
  data: CardType;
  filter?: string;
  filter_type?: string;
}

type Props = OwnProps;

const Card: FC<Props> = ({ data, filter = null, filter_type = null }) => {
  const router = useRouter();

  const { term = '', defenition = '', imgurl = '', _id, moduleID, creation_date } = data;

  const filterRegExp = new RegExp(
    `${filter}(?!br>|r>|>|\/div>|div>|iv>|v>|nbsp;|bsp;|sp;|p;|;|\/span>|span>|pan>|an>|n>)`,
    'g'
  );

  const replacement = `<span class='bcc-yellow'>${filter}</span>`;

  let formatted_term: string, formatted_definition: string;

  if (filter_type === 'term') formatted_term = term.replace(filterRegExp, replacement);
  if (filter_type === 'defenition')
    formatted_definition = defenition.replace(filterRegExp, replacement);

  const isModule = router.pathname === '/module/[_id]';

  const [visible, ref, Plug] = usePlug('module__card');

  return (
    <>
      {visible ? (
        <div className='module__card' ref={ref}>
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
                  <span>To the card&apos;s module</span>
                </div>
              </Link>
            )}
          </div>
          <div className='module__card-main'>
            <div className='module__card-term'>
              <ContentEditable
                html={filter_type === 'term' && filter ? formatted_term : term}
                disabled={true}
                onChange={null}
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
                    filter_type === 'defenition' && filter
                      ? formatted_definition
                      : defenition
                  }
                  disabled={true}
                  onChange={null}
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
                isHideOnLoading={false}
              />
            </div>
          </div>
        </div>
      ) : (
        Plug
      )}
    </>
  );
};

export default Card;
