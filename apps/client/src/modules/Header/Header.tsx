import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { getIsGame } from "@helpers/functions/determinePath";
import { useAuthSession, useAuthStore } from "@zustand/auth";
import { useLayoutStore } from "@zustand/layout";
import clsx from "clsx";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useRef } from "react";

import { Left, Right } from "./components/Content";
import s from "./styles.module.scss";

const Header = () => {
  const router = useRouter();

  const setHeaderDimensions = useLayoutStore(s => s.setHeaderDimensions);

  const user = useAuthStore(s => s.user);
  const { isPending } = useAuthSession();

  const isGame = getIsGame(router.pathname);

  const onSizeChange = useCallback(() => {
    const rect = headerEl.current?.getBoundingClientRect();
    setHeaderDimensions({
      height: rect?.height ?? 0,
      width: rect?.width ?? 0,
    });
  }, [setHeaderDimensions]);

  const onSizeChangeDelayed = useCallback(
    () =>
      setTimeout(() => {
        const rect = headerEl.current?.getBoundingClientRect();
        setHeaderDimensions({
          height: rect?.height ?? 0,
          width: rect?.width ?? 0,
        });
      }, 110),
    [setHeaderDimensions],
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
      window.removeEventListener("resize", onSizeChangeDelayed);
      window.removeEventListener("orientationchange", onSizeChangeDelayed);
      observer.unobserve(currentHeaderEl);
    };
  }, [onSizeChange, onSizeChangeDelayed]);

  useEffect(() => {
    const rect = headerEl.current?.getBoundingClientRect();
    setHeaderDimensions({
      height: rect?.height ?? 0,
      width: rect?.width ?? 0,
    });
  }, [user, isPending, setHeaderDimensions]);

  const headerEl = useRef<HTMLElement>(null);

  return (
    <header
      id="app-header"
      className={clsx(s.header, isGame && s.sticky)}
      ref={headerEl}
    >
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
