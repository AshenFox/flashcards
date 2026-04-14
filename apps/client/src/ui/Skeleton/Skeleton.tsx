import clsx from "clsx";
import React, { memo } from "react";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";

import s from "./styles.module.scss";

type CustomSkeletonProps = SkeletonProps;

const CustomSkeleton = (props: CustomSkeletonProps) => (
  <Skeleton
    baseColor="var(--skeleton-base-color)"
    highlightColor="var(--skeleton-highlight-color)"
    inline
    {...props}
    className={clsx(s.skeleton, props.className)}
  />
);

export default memo(CustomSkeleton);
