import Container from "@components/Container";
import { useActions } from "@store/hooks";
import { TriangleLeftIcon } from "@ui/Icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, ReactNode, useEffect, useRef } from "react";

import s from "./styles.module.scss";

type ControlsProps = {
  title: string;
  titleIcon?: ReactNode;
  children?: ReactNode;
};

const Controls = ({ title, titleIcon, children }: ControlsProps) => {
  const { set_game_controls_dimen } = useActions();

  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === "sr";

  const onSizeChange = (e: UIEvent | Event) =>
    set_game_controls_dimen(controlsEl.current);

  useEffect(() => {
    set_game_controls_dimen(controlsEl.current);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onSizeChange);
    window.addEventListener("orientationchange", onSizeChange);

    return () => {
      window.removeEventListener("resize", onSizeChange);
      window.removeEventListener("orientationchange", onSizeChange);
    };
  }, []);

  const controlsEl = useRef<HTMLDivElement>(null);

  return (
    <Container noPadding>
      <div className={s.container} ref={controlsEl}>
        <div className={s.controls}>
          <div className={s.back}>
            <Link href={isSR ? "/home/sr" : `/module/${_id}`}>
              <button
                //helpers-delete
                className="grey ai-c ta-l fz17 width100 pad15-20 h-bcc-yellow"
              >
                <TriangleLeftIcon height="15" width="15" />
                <span>Back</span>
              </button>
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
