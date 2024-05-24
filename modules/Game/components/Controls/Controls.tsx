import Container from "@components/Container";
import { useAppSelector } from "@store/store";
import { TriangleLeftIcon } from "@ui/Icons";
import { Link } from "@ui/InteractiveElement";
import { useRouter } from "next/router";
import { CSSProperties, memo, ReactNode, useRef } from "react";

import s from "./styles.module.scss";

type ControlsProps = {
  title: string;
  titleIcon?: ReactNode;
  children?: ReactNode;
};

const Controls = ({ title, titleIcon, children }: ControlsProps) => {
  const router = useRouter();
  const { _id } = router.query;

  const header_height = useAppSelector(s => s.dimen.header_height);

  const isSR = _id === "sr";

  const controlsEl = useRef<HTMLDivElement>(null);

  const stylesContainer: CSSProperties = { top: `${header_height}px` };

  return (
    <Container noPadding>
      <div className={s.container} ref={controlsEl} style={stylesContainer}>
        <div className={s.controls}>
          <div className={s.back}>
            <Link
              href={isSR ? "/home/sr" : `/module/${_id}`}
              design="plain"
              icon={<TriangleLeftIcon />}
              iconSize={15}
            >
              Back
            </Link>
          </div>

          <div className={s.title}>
            {titleIcon}
            <span>{title}</span>
          </div>

          {children}
        </div>
      </div>
    </Container>
  );
};

export default memo(Controls);
