import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { memo } from "react";

import CardsContainer from "./components/CardsContainer";
import Param from "./components/Param/Param";
import s from "./styles.module.scss";

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
