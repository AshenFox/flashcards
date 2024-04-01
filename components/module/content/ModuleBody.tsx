import Param from './Param';
import CardsContainer from './CardsContainer';
import ContentWrapper from '@components/ContentWrapper';
import { FC } from 'react';
import Container from '@components/Container';

interface OwnProps {}

type Props = OwnProps;

const ModuleContainer: FC<Props> = () => (
  <ContentWrapper>
    <div className='module__body'>
      <Container>
        <Param />
        <CardsContainer />
      </Container>
    </div>
  </ContentWrapper>
);

export default ModuleContainer;
