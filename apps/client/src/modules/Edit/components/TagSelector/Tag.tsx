import { DeleteIcon } from "@ui/Icons";
import React, { memo } from "react";

import styles from "./styles.module.scss";

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
  return (
    <div
      className={`${styles.tag} ${isEditing ? styles.editing : ""}`}
      onClick={() => onTagClick(index)}
    >
      <span className={styles.tagLabel}>{tag.label}</span>
      <button
        className={styles.deleteButton}
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
