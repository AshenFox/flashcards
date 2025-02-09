import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { useActions, useAppSelector } from "@store/hooks";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect } from "react";

import Header from "./components/Header";
import Sections from "./components/Sections";
import s from "./styles.module.scss";

const checkBottom = () => {
  const windowHeight = document.documentElement.clientHeight;

  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );

  const currentScroll = window.scrollY;

  const bottomOffset = scrollHeight - windowHeight - currentScroll;

  return bottomOffset <= 75;
};

const Home = () => {
  const router = useRouter();
  const { section } = router.query;

  const { getModules, getCards, get_sr_count } = useActions();

  const modules = useAppSelector(s => s.main.modules);
  const cards = useAppSelector(s => s.main.cards);
  const user = useAppSelector(s => s.auth.user);

  const loadContent = useCallback(() => {
    if (!modules.length && section === "modules") getModules();
    if (!cards.length && section === "cards") getCards();
    if (section === "sr") get_sr_count();
  }, [
    section,
    cards.length,
    modules.length,
    getCards,
    getModules,
    get_sr_count,
  ]);

  useEffect(() => {
    if (!user) return;

    loadContent();
  }, [user, loadContent]);

  useEffect(() => {
    const scrollModules = () =>
      router.pathname === "/home/[section]" && checkBottom() && getModules();

    const scrollCards = () =>
      router.pathname === "/home/[section]" && checkBottom() && getCards();

    if (section === "modules") window.addEventListener("scroll", scrollModules);
    if (section === "cards") window.addEventListener("scroll", scrollCards);

    return () => {
      window.removeEventListener("scroll", scrollModules);
      window.removeEventListener("scroll", scrollCards);
    };
  }, [section, router.pathname, getCards, getModules]);

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
