import PropTypes from 'prop-types';
import Param from './Param';
import CardsContainer from './CardsContainer';
import ContentWrapper from '../../main/ContentWrapper';

const ModuleContainer = () => (
  <ContentWrapper>
    <div className='module__body'>
      <div className='container'>
        <Param />
        <CardsContainer />
      </div>
    </div>
  </ContentWrapper>
);

ModuleContainer.propTypes = {};

export default ModuleContainer;
