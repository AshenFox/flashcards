import { FC, useRef } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import Gallery from '@components/Gallery';
import Scrape from './Scrape';
import EditCardSave from './EditCardSave';
import EditCardClose from './EditCardClose';
import EditCardDelete from './EditCardDelete';
import EditCardAddImg from './EditCardAddImg';
import { Card } from '../../../store/reducers/main/mainInitState';
import { useActions } from '../../../store/hooks';
import { usePlug } from '../../main/hooks';

interface OwnProps {
  data: Card;
  loading?: boolean;
  draft?: boolean;
  index?: number;
  toggle?: boolean;
  game?: boolean;
  number?: number;
}

type Props = OwnProps;

const EditCard: FC<Props> = ({ data, loading, draft, index, toggle, game, number }) => {
  const { control_card, edit_card } = useActions();

  const { _id, term, defenition, gallery } = data || {};

  const { search } = gallery || {};

  const handleCardChange = (type: 'term' | 'defenition') => (e: ContentEditableEvent) => {
    control_card(_id, type, e.target.value);
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      edit_card(_id);
      timer.current = null;
    }, 500);
  };

  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const deleteActive = number > 2;

  const [visible, ref, Plug] = usePlug('edit__cards-card');

  return (
    <>
      {visible ? (
        <div
          ref={ref}
          className={`edit__cards-card ${game ? 'edit__cards-card--game' : ''}`}
        >
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
              <label className='edit__cards-label'>TERM</label>
            </div>

            <div className='edit__cards-definition'>
              <div className='edit__cards-definition-input'>
                <ContentEditable
                  html={defenition}
                  disabled={loading}
                  className='textarea'
                  onChange={handleCardChange('defenition')}
                />
                <label className='edit__cards-label' htmlFor='cards__definition-input1'>
                  DEFINITION
                </label>
              </div>
              <EditCardAddImg data={data} />
            </div>
          </div>
          <Scrape data={data} />
          <Gallery data={data} active={search} game={game} />
        </div>
      ) : (
        Plug
      )}
    </>
  );
};

export default EditCard;
