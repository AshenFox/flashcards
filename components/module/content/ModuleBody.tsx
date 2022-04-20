import Param from './Param';
import CardsContainer from './CardsContainer';
import ContentWrapper from '../../main/ContentWrapper';
import { FC } from 'react';

interface OwnProps {}

type Props = OwnProps;

const ModuleContainer: FC<Props> = () => (
  <ContentWrapper>
    <div className='module__body'>
      <div className='container'>
        <Param />
        <CardsContainer />
      </div>
    </div>
  </ContentWrapper>
);

export default ModuleContainer;
