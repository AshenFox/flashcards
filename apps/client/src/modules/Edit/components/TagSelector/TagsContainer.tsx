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
  // Function to render hierarchical tag content
  const renderTagContent = (tagLabel: string) => {
    const parts = tagLabel.split("::");

    if (parts.length === 1) {
      // No hierarchy, display as normal
      return <span className={styles.tagLabel}>{tagLabel}</span>;
    }

    // Display as hierarchy
    return (
      <span className={styles.hierarchyContainer}>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <span
              className={`${styles.hierarchyPart} ${
                index === 0
                  ? styles.rootPart
                  : index === parts.length - 1
                    ? styles.leafPart
                    : styles.middlePart
              }`}
            >
              {part}
            </span>
            {index < parts.length - 1 && (
              <span className={styles.hierarchySeparator}>›</span>
            )}
          </React.Fragment>
        ))}
      </span>
    );
  };

  return (
    <div className={styles.tagsContainer}>
      {tags.map((tag, index) => (
        <div
          key={index}
          className={`${styles.tag} ${editingIndex === index ? styles.editing : ""} ${
            tag.label.includes("::") ? styles.hierarchyTag : ""
          }`}
          onClick={() => onTagClick(index)}
        >
          {renderTagContent(tag.label)}
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
