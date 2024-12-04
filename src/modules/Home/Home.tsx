import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { useActions, useAppSelector } from "@store/hooks";
import { useRouter } from "next/router";
import { memo, useEffect, useRef } from "react";

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

  const { get_modules, get_cards, reset_search, get_sr_count } = useActions();

  const modules = useAppSelector(s => s.main.modules);
  const cards = useAppSelector(s => s.main.cards);
  const user = useAppSelector(s => s.auth.user);

  useEffect(() => {
    if (!user) return;
    reset_search();
    loadContent();
  }, [user, section]);

  useEffect(() => {
    if (section === "modules") {
      window.addEventListener("scroll", scrollModules.current);
      window.removeEventListener("scroll", scrollCards.current);
    }

    if (section === "cards") {
      window.addEventListener("scroll", scrollCards.current);
      window.removeEventListener("scroll", scrollModules.current);
    }

    if (section === "sr") {
      window.removeEventListener("scroll", scrollCards.current);
      window.removeEventListener("scroll", scrollModules.current);
    }

    return () => {
      window.removeEventListener("scroll", scrollModules.current);
      window.removeEventListener("scroll", scrollCards.current);
    };
  }, [section]);

  const loadContent = () => {
    if (!modules.length && section === "modules") get_modules(true);
    if (!cards.length && section === "cards") get_cards(true);
    if (section === "sr") get_sr_count();
  };

  const scrollModules = useRef(
    () =>
      router.pathname === "/home/[section]" && checkBottom() && get_modules(),
  );
  const scrollCards = useRef(
    () => router.pathname === "/home/[section]" && checkBottom() && get_cards(),
  );

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
