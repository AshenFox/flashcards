import { FC, useRef } from 'react';
import { useRouter } from 'next/router';
import ContentEditable from 'react-contenteditable';
import ModuleSave from './ModuleSave';
import ContentWrapper from '../../main/ContentWrapper';
import { useActions, useAppSelector } from '../../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const EditModule: FC<Props> = () => {
  const { control_module, edit_module } = useActions();

  const router = useRouter();
  const { _id } = router.query;

  const isDraft = _id === 'draft';

  const { module, loading, cards } = useAppSelector(({ main }) => main);

  const { title, draft } = module || {};

  const handleModuleChange = (e) => {
    control_module(e.target.value);

    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      edit_module();
      timer.current = null;
    }, 500);
  };

  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const cardsArr = Object.values(cards);

  let twoSaved = false;
  let counter = 0;

  if (draft) {
    for (const card of cardsArr) {
      if (card.save === true) {
        ++counter;
        if (counter >= 2) {
          twoSaved = true;
          break;
        }
      }
    }
  }

  let active = draft ? !!(twoSaved && title) : !!title;
  if (!cardsArr.length) active = true;

  const errMessage = draft
    ? 'PLEASE ENTER A TITLE AND ENSURE SAVING OF AT LEAST 2 CARDS'
    : 'PLEASE ENTER A TITLE';

  return (
    <div className='edit__module'>
      <ContentWrapper tagType='section'>
        <div className='container'>
          <div className='edit__module-content'>
            <div className='edit__module-title'>
              <ContentEditable
                html={title ? title : ''}
                disabled={loading}
                className={`textarea textarea--module ${active ? '' : 'error'}`}
                onChange={handleModuleChange}
              />
              <div className={`label ${active ? '' : 'error'}`} id='title-error'>
                {active ? 'TITLE' : errMessage}
              </div>
            </div>
          </div>
          {(draft || isDraft) && (
            <div className='edit__module-control'>
              <ModuleSave />
            </div>
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default EditModule;
