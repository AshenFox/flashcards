import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { useAppSelector } from "@store/hooks";
import { Link } from "@ui/InteractiveElement";
import Skeleton from "@ui/Skeleton";
import clsx from "clsx";
import { memo } from "react";

import Info from "./components/Info/Info";
import Study from "./components/Study/Study";
import s from "./styles.module.scss";

const Header = () => {
  const title = useAppSelector(s => s.main.module?.title);
  const loading = useAppSelector(s => s.main.sections?.module.loading);

  return (
    <div className={s.header}>
      <ContentWrapper tagType="section">
        <Container>
          <div className={s.top}>
            <div className={clsx(s.title, !title && s.noTitle)}>
              <h1>
                {loading && !title ? <Skeleton width={"15rem"} /> : title}
              </h1>
            </div>
            <div className={s.return}>
              <Link isReturn>Return</Link>
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
