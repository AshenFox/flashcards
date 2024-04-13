import { useRouter } from 'next/router';
import Speaker from '@components/Speaker';
import CardEditControl from './CardEditControl';
import CardQuestion from './CardQuestion';
import CardSRDropControl from './components/CardSRDropControl/CardSRDropControl';
import CardSRControl from './components/CardSRControl';
import Img from '@ui/Img';
import DateStr from '@ui/DateStr';
import { FC } from 'react';
import { Card as CardType } from '../../../store/reducers/main/mainInitState';
import { usePlug } from '@helpers/hooks/usePlug';
import ModuleLink from './components/ModuleLink';
import Textarea from '@ui/Textarea';

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
            {!isModule && <ModuleLink moduleId={moduleID} />}
          </div>
          <div className='module__card-main'>
            <div className='module__card-term'>
              <Textarea html={filter_type === 'term' && filter ? formatted_term : term} />
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
                <Textarea
                  html={
                    filter_type === 'defenition' && filter
                      ? formatted_definition
                      : defenition
                  }
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
