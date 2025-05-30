import React from "react";

import styles from "./styles.module.scss";
import { TagsContainerProps } from "./types";

const TagsContainer: React.FC<TagsContainerProps> = ({
  tags,
  editingIndex,
  disabled = false,
  onTagClick,
  onDeleteTag,
}) => {
  return (
    <div className={styles.tagsContainer}>
      {tags.map((tag, index) => (
        <div
          key={index}
          className={`${styles.tag} ${editingIndex === index ? styles.editing : ""}`}
          onClick={() => onTagClick(index)}
        >
          <span className={styles.tagLabel}>{tag.label}</span>
          <button
            className={styles.deleteButton}
            onClick={e => {
              e.stopPropagation();
              onDeleteTag(index);
            }}
            disabled={disabled}
            aria-label={`Delete ${tag.label} tag`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default TagsContainer;
