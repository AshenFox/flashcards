import React, { memo } from "react";

import styles from "./styles.module.scss";
import TagPart from "./TagPart";

type TagLabelProps = {
  label: string;
  active: boolean;
  children?: React.ReactNode;
};

const TagLabel = ({ children, active, label }: TagLabelProps) => {
  const tagParts = label
    .split(">")
    .map(part => part.trim())
    .filter(part => part.length > 0);

  // If more than 3 parts, show ellipsis and last 3 parts
  const displayParts =
    tagParts.length > 3 ? ["...", ...tagParts.slice(-3)] : tagParts;

  return (
    <div className={styles.tagLabel}>
      {children}
      {displayParts.map((part: string, partIndex: number) => (
        <TagPart
          key={partIndex}
          part={part}
          showSeparator={partIndex < tagParts.length - 1}
          active={active}
        />
      ))}
    </div>
  );
};

export default memo(TagLabel);
