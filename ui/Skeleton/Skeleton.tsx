import React, { memo } from "react";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";

type CustomSkeletonProps = SkeletonProps;

const CustomSkeleton = (props: CustomSkeletonProps) => (
  <Skeleton
    baseColor="var(--subtle-text-color)"
    highlightColor="var(--stronger-subtle-text-color)"
    inline
    {...props}
  />
);

export default memo(CustomSkeleton);
