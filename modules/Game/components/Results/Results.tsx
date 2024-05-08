import Link from "next/link";
import { useRouter } from "next/router";
import { memo, ReactNode, useEffect } from "react";

import s from "./styles.module.scss";

type ResultsProps = {
  title: string;
  progress: number;
  all: number;
  showLink?: boolean;
  children?: ReactNode;
};

const Results = ({
  title,
  progress,
  all,
  showLink = true,
  children,
}: ResultsProps) => {
  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === "sr";

  useEffect(() => {
    const keyDownFinish = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        router.replace(isSR ? "/home/sr" : `/module/${_id}`);
      }
    };

    window.addEventListener("keydown", keyDownFinish);

    return () => {
      window.removeEventListener("keydown", keyDownFinish);
    };
  }, [_id, isSR, router]);

  return (
    <div className={s.finish}>
      <div className={s.header}>
        <div className={s.header_item}>
          <h1 className={s.title}>{title}</h1>
          <h3 className={s.stats}>
            {progress}/{all} - {Math.round((progress / all) * 100)}%
          </h3>
        </div>

        {showLink && (
          <div className={s.header_item}>
            <Link href={isSR ? "/home/sr" : `/module/${_id}`}>
              <button
                //helpers-delete
                className="bcc-lightblue pad10-30 brr15 white fz15 fw-normal h-grey h-bcc-yellow"
              >
                Finish game
              </button>
            </Link>
          </div>
        )}
      </div>

      <div>{children}</div>
    </div>
  );
};

export default memo(Results);
