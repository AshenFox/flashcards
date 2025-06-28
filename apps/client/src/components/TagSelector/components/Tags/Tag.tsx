import { DeleteIcon } from "@ui/Icons";
import React, { memo, MouseEventHandler, useCallback } from "react";

import styles from "./styles.module.scss";
import TagLabel from "./TagLabel";

interface TagProps {
  tag: { label: string };
  index: number;
  isEditing: boolean;
  onTagClick: (index: number) => void;
  onDeleteTag: (index: number) => void;
}

const Tag: React.FC<TagProps> = ({
  tag,
  index,
  isEditing,
  onTagClick,
  onDeleteTag,
}) => {
  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    e => {
      e.stopPropagation();
      onTagClick(index);
    },
    [onTagClick, index],
  );

  return (
    <div
      className={`${styles.tag} ${isEditing ? styles.editing : ""}`}
      onClick={handleClick}
    >
      <TagLabel label={tag.label} active={isEditing} />
      <button
        className={styles.delete}
        onClick={e => {
          e.stopPropagation();
          onDeleteTag(index);
        }}
        aria-label={`Delete ${tag.label} tag`}
      >
        <DeleteIcon width="12" height="12" />
      </button>
    </div>
  );
};

export default memo(Tag);
