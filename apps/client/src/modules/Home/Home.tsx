import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { memo } from "react";

import Header from "./components/Header";
import Sections from "./components/Sections";
import s from "./styles.module.scss";

const Home = () => {
  return (
    <ContentWrapper>
      <Container>
        <div className={s.content}>
          <Header />
          <Sections />
        </div>
      </Container>
    </ContentWrapper>
  );
};

export default memo(Home);
