import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { getIsGame } from "@helpers/functions/determinePath";
import { useActions, useAppSelector } from "@store/hooks";
import clsx from "clsx";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useRef } from "react";

import { Left, Right } from "./components/Content";
import s from "./styles.module.scss";

const Header = () => {
  const router = useRouter();

  const { setHeaderDimen } = useActions();

  const user = useAppSelector(s => s.auth.user);
  const loading = useAppSelector(s => s.auth.loading);

  const isGame = getIsGame(router.pathname);

  const onSizeChange = useCallback(
    () => setHeaderDimen({ el: headerEl.current }),
    [setHeaderDimen],
  );
  const onSizeChangeDelayed = useCallback(
    () => setTimeout(() => setHeaderDimen({ el: headerEl.current }), 110),
    [setHeaderDimen],
  );

  useEffect(() => {
    const currentHeaderEl = headerEl.current;

    window.addEventListener("resize", onSizeChangeDelayed);
    window.addEventListener("orientationchange", onSizeChangeDelayed);
    const observer = new ResizeObserver(() => {
      onSizeChangeDelayed();
    });

    observer.observe(currentHeaderEl);

    return () => {
      window.removeEventListener("resize", onSizeChange);
      window.removeEventListener("orientationchange", onSizeChangeDelayed);
      observer.unobserve(currentHeaderEl);
    };
  }, [onSizeChange, onSizeChangeDelayed]);

  useEffect(() => {
    setHeaderDimen({ el: headerEl.current });
  }, [user, loading, setHeaderDimen]);

  const headerEl = useRef<HTMLElement>(null);

  return (
    <header className={clsx(s.header, isGame && s.sticky)} ref={headerEl}>
      <ContentWrapper tagType="section">
        <Container>
          <div className={s.content}>
            <Left />
            <Right />
          </div>
        </Container>
      </ContentWrapper>
    </header>
  );
};

export default memo(Header);
