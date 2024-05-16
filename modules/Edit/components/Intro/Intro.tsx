import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { useAppSelector } from "@store/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";

import s from "./styles.module.scss";

const Intro = () => {
  const router = useRouter();

  const { _id } = router.query;

  const currentModule = useAppSelector(s => s.main.module);

  const { draft } = currentModule || {};

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
                <button
                  //helpers-delete
                  className=" pad12-30 fz15 fw-normal "
                  type="button"
                >
                  Return
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </ContentWrapper>
    </div>
  );
};

export default memo(Intro);
