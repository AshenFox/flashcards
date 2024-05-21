import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { useAppSelector } from "@store/hooks";
import { Button, Link } from "@ui/InteractiveElement";
import Skeleton from "@ui/Skeleton";
import clsx from "clsx";
import { memo } from "react";

import Info from "./components/Info/Info";
import Study from "./components/Study/Study";
import s from "./styles.module.scss";

const Header = () => {
  const currentModule = useAppSelector(s => s.main.module);

  const { title } = currentModule || {};

  return (
    <div className={s.header}>
      <ContentWrapper tagType="section">
        <Container>
          <div className={s.top}>
            <div className={clsx(s.title, !title && s.noTitle)}>
              <h1>
                {module ? (
                  title ? (
                    title
                  ) : (
                    "(Untitled)"
                  )
                ) : (
                  <Skeleton width={150} />
                )}
              </h1>
            </div>
            <div className={s.return}>
              <Link href={"/home/modules"}>Return</Link>
            </div>
          </div>
          <Study />
          <Info />
        </Container>
      </ContentWrapper>
    </div>
  );
};

export default memo(Header);
