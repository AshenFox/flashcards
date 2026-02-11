import { clsx } from "clsx";
import React, { memo } from "react";

import styles from "./styles.module.scss";

interface TagPartProps {
  part: string;
  showSeparator?: boolean;
  active?: boolean;
}

const TagPart: React.FC<TagPartProps> = ({
  part,
  showSeparator = true,
  active = false,
}) => {
  return (
    <>
      <span className={clsx(styles.tagPart, active && styles.editing)}>
        {part}
      </span>
      {showSeparator && <span className={styles.separator}>{">"} </span>}
    </>
  );
};

export default memo(TagPart);
