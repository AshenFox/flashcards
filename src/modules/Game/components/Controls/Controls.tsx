import Container from "@components/Container";
import { useAppSelector } from "@store/store";
import { TriangleLeftIcon } from "@ui/Icons";
import { Link } from "@ui/InteractiveElement";
import { useRouter } from "next/router";
import { CSSProperties, memo, ReactNode } from "react";

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

  const containerStyles: CSSProperties = { top: `${header_height}px` };
  const controlsStyles: CSSProperties = { top: `${header_height}px` };

  return (
    <Container className={s.container} style={containerStyles} noPadding>
      <div className={s.controls} style={controlsStyles}>
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
    </Container>
  );
};

export default memo(Controls);
