import { useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { control_module, edit_module } from '../../../store/actions/editActions';
import ContentEditable from 'react-contenteditable';
import ModuleSave from './ModuleSave';
import ContentWrapper from '../../main/ContentWrapper';

const EditModule = ({ main, control_module, edit_module }) => {
  const router = useRouter();
  const { _id } = router.query;

  const isDraft = _id === 'draft';

  const { module, loading, cards } = main;
  const { title, draft } = module ? module : {};

  const handleModuleChange = (e) => {
    control_module(e.target.value);

    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      edit_module();
      timer.current = false;
    }, 500);
  };

  const timer = useRef(false);

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

EditModule.propTypes = {
  main: PropTypes.object.isRequired,
  control_module: PropTypes.func.isRequired,
  edit_module: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, { control_module, edit_module })(EditModule);
