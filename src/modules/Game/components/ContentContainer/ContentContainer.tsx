import clsx from "clsx";
import { memo, ReactNode } from "react";

import s from "./styles.module.scss";

type ContentContainerProps = {
  loading: boolean;
  children: ReactNode;
  isScrollable?: boolean;
};

const ContentContainer = ({
  loading,
  children,
  isScrollable = true,
}: ContentContainerProps) => {
  return (
    <main
      className={clsx(
        s.container,
        isScrollable ? s.scrollable : s.unscrollable,
      )}
    >
      <div className={clsx(s.components, loading && s.loading)}>
        {loading ? <div className={s.spinner} /> : children}
      </div>
    </main>
  );
};

export default memo(ContentContainer);
