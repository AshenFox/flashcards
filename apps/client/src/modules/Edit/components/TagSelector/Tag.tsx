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
  const tagParts = tag.label
    .split(">")
    .map(part => part.trim())
    .filter(part => part.length > 0);

  return (
    <div
      className={`${styles.tag} ${isEditing ? styles.editing : ""}`}
      onClick={() => onTagClick(index)}
    >
      <div className={styles.tagLabel}>
        {tagParts.map((part, partIndex) => (
          <React.Fragment key={partIndex}>
            <span className={styles.tagPart}>{part}</span>
            {partIndex < tagParts.length - 1 && (
              <span className={styles.tagSeparator}>{">"} </span>
            )}
          </React.Fragment>
        ))}
      </div>
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
