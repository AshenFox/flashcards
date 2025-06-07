import { DeleteIcon } from "@ui/Icons";
import React, { memo } from "react";

import styles from "./styles.module.scss";
import TagPart from "./TagPart";

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

  // If more than 3 parts, show ellipsis and last 3 parts
  const displayParts =
    tagParts.length > 3 ? ["...", ...tagParts.slice(-3)] : tagParts;

  return (
    <div
      className={`${styles.tag} ${isEditing ? styles.editing : ""}`}
      onClick={() => onTagClick(index)}
    >
      <div className={styles.tagLabel}>
        {displayParts.map((part, partIndex) => (
          <TagPart
            key={partIndex}
            part={part}
            active={isEditing}
            showSeparator={partIndex < displayParts.length - 1}
          />
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
