import { memo } from 'react';
import Speaker from '@components/Speaker';
import { Edit, SRDrop, SR } from './components/controls';
import Question from './components/Question';
import Img from '@ui/Img';
import DateStr from '@ui/DateStr';
import { Card as CardType } from '@store/reducers/main/mainInitState';
import { usePlug } from '@helpers/hooks/usePlug';
import ModuleLink from './components/ModuleLink';
import TextArea from '@ui/TextArea';
import s from './styles.module.scss';

type CardProps = {
  data: CardType;
  isModuleLink?: boolean;
  filter?: string;
  filterType?: string;
};

const Card = ({
  data,
  isModuleLink = false,
  filter = null,
  filterType = null,
}: CardProps) => {
  const { term = '', defenition = '', imgurl = '', _id, moduleID, creation_date } = data;

  const filterRegExp = new RegExp(
    `${filter}(?!br>|r>|>|\/div>|div>|iv>|v>|nbsp;|bsp;|sp;|p;|;|\/span>|span>|pan>|an>|n>)`,
    'g'
  );

  //helpers-delete
  const replacement = `<span class='bcc-yellow'>${filter}</span>`;

  let formatted_term: string, formatted_definition: string;

  if (filterType === 'term') formatted_term = term.replace(filterRegExp, replacement);
  if (filterType === 'defenition')
    formatted_definition = defenition.replace(filterRegExp, replacement);

  const [visible, ref, Plug] = usePlug(s.card);

  return (
    <>
      {visible ? (
        <div className={s.card} ref={ref}>
          <div className={s.header}>
            <div className={s.created}>
              <span>
                Created <DateStr date={creation_date} />
              </span>
            </div>
            {isModuleLink && <ModuleLink moduleId={moduleID} />}
          </div>
          <div className={s.main}>
            <div className={s.term}>
              <TextArea html={filterType === 'term' && filter ? formatted_term : term} />
              <div className={s.controls}>
                <Edit data={data} />
                <SR data={data} />
                <SRDrop data={data} />
              </div>
              <Question data={data} />
              <Speaker _id={_id} text={term} type={'term'} className={s.speaker} />
            </div>
            <div className={s.definition_container}>
              <div className={s.definition}>
                <TextArea
                  html={
                    filterType === 'defenition' && filter
                      ? formatted_definition
                      : defenition
                  }
                />
                <Speaker
                  _id={_id}
                  text={defenition}
                  type={'definition'}
                  className={s.speaker}
                />
              </div>
              <Img
                containerClass={s.img_container}
                imgClass={s.img}
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

export default memo(Card);
