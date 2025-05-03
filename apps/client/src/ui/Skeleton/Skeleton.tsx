import React, { memo } from "react";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";

import s from "./styles.module.scss";

type CustomSkeletonProps = SkeletonProps;

const CustomSkeleton = (props: CustomSkeletonProps) => (
  <Skeleton
    className={s.skeleton}
    baseColor="var(--skeleton-base-color)"
    highlightColor="var(--skeleton-highlight-color)"
    inline
    {...props}
  />
);

export default memo(CustomSkeleton);
