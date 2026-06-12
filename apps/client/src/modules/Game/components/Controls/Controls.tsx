import Container from "@components/Container";
import { TriangleLeftIcon } from "@ui/Icons";
import { Link } from "@ui/InteractiveElement";
import { useLayoutStore } from "@zustand/layout";
import { CSSProperties, memo, ReactNode } from "react";

import s from "./styles.module.scss";

type ControlsProps = {
  title: string;
  titleIcon?: ReactNode;
  children?: ReactNode;
};

const Controls = ({ title, titleIcon, children }: ControlsProps) => {
  const header_height = useLayoutStore(s => s.header_height);

  const styles: CSSProperties = { top: `${header_height}px` };

  return (
    <Container className={s.container} style={styles} noPadding>
      <div className={s.controls} style={styles}>
        <div className={s.back}>
          <Link
            isReturn
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
