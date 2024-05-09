import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { useAppSelector } from "@store/hooks";
import Link from "next/link";
import { memo } from "react";
import Skeleton from "react-loading-skeleton";

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
            <div className={s.title}>
              <h1
                //helpers-delete
                className={`${title ? "" : "blue"}`}
              >
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
              <Link href={"/home/modules"}>
                <button
                  //helpers-delete
                  className="bcc-lightblue pad12-30 brr15 white fz15 fw-normal h-grey h-bcc-yellow"
                >
                  Return
                </button>
              </Link>
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
