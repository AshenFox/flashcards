import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { useAppSelector } from "@store/hooks";
import { Button, Link } from "@ui/InteractiveElement";
// import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";

import s from "./styles.module.scss";

const Intro = () => {
  const draft = useAppSelector(s => s.main.module?.draft);
  const _id = useAppSelector(s => s.main.module?._id);

  return (
    <div className={s.intro}>
      <ContentWrapper tagType="section">
        <Container>
          <div className={s.content}>
            <div className={s.info}>
              <h2>Edit the study set</h2>
            </div>
            <div className={s.return}>
              <Link href={draft ? "/home/modules" : `/module/${_id}`}>
                Return
              </Link>
            </div>
          </div>
        </Container>
      </ContentWrapper>
    </div>
  );
};

export default memo(Intro);
