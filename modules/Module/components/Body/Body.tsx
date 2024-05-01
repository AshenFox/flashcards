import { memo } from 'react';
import Param from './components/Param/Param';
import CardsContainer from './components/CardsContainer';
import ContentWrapper from '@components/ContentWrapper';
import Container from '@components/Container';
import s from './styles.module.scss';

const Body = () => (
  <ContentWrapper>
    <div className={s.body}>
      <Container>
        <Param />
        <CardsContainer />
      </Container>
    </div>
  </ContentWrapper>
);

export default memo(Body);
