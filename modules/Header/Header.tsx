import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { useActions, useAppSelector } from "@store/hooks";
import { memo, useCallback, useEffect, useRef, useState } from "react";

import { Left, Right } from "./components/Content";
import s from "./styles.module.scss";

const Header = () => {
  const { set_header_dimen } = useActions();

  const user = useAppSelector(s => s.auth.user);
  const loading = useAppSelector(s => s.auth.loading);

  const onSizeChange = useCallback(
    (e: UIEvent) => set_header_dimen(headerEl.current),
    [set_header_dimen],
  );
  const onSizeChangeDelayed = useCallback(
    (e: Event) => setTimeout(() => set_header_dimen(headerEl.current), 200),
    [set_header_dimen],
  );

  useEffect(() => {
    window.addEventListener("resize", onSizeChange);
    window.addEventListener("orientationchange", onSizeChangeDelayed);

    return () => {
      window.removeEventListener("resize", onSizeChange);
      window.removeEventListener("orientationchange", onSizeChangeDelayed);
    };
  }, [onSizeChange, onSizeChangeDelayed]);

  useEffect(() => {
    set_header_dimen(headerEl.current);
  }, [user, loading, set_header_dimen]);

  const headerEl = useRef<HTMLElement>(null);

  return (
    <header className={s.header} ref={headerEl}>
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
