import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { useActions, useAppSelector } from "@store/hooks";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect } from "react";

import { checkBottom } from "@helpers/functions/checkBottom";
import Header from "./components/Header";
import Sections from "./components/Sections";
import s from "./styles.module.scss";

const Home = () => {
  const router = useRouter();
  const { section } = router.query;

  const { getCards } = useActions();

  const cards = useAppSelector(s => s.main.cards);
  const user = useAppSelector(s => s.auth.user);

  const loadContent = useCallback(() => {
    if (!cards.length && section === "cards") getCards();
  }, [section, cards.length, getCards]);

  useEffect(() => {
    if (!user) return;

    loadContent();
  }, [user, loadContent]);

  useEffect(() => {
    const scrollCards = () =>
      router.pathname === "/home/[section]" && checkBottom() && getCards();

    if (section === "cards") window.addEventListener("scroll", scrollCards);

    return () => {
      window.removeEventListener("scroll", scrollCards);
    };
  }, [section, router.pathname, getCards]);

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
