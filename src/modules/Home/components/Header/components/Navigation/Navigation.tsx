import { Block, Link } from "@ui/InteractiveElement";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";

import s from "./styles.module.scss";

const Navigation = () => {
  const router = useRouter();
  const { section } = router.query;

  const _default =
    section !== "cards" && section !== "modules" && section !== "sr";

  useEffect(() => {
    if (_default && section !== undefined) router.replace("/home/modules");
  }, [section]);

  return (
    <div className={s.container}>
      <Block>
        <Link href="/home/cards" pressed={section === "cards"} design="outline">
          Cards
        </Link>
        <Link
          href="/home/modules"
          pressed={section === "modules"}
          design="outline"
        >
          Modules
        </Link>
        <Link href="/home/sr" pressed={section === "sr"} design="outline">
          SR
        </Link>
      </Block>
    </div>
  );
};

export default memo(Navigation);
