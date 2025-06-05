import { DeleteIcon } from "@ui/Icons";
import React, { memo } from "react";

import styles from "./styles.module.scss";
import { useTagSelectorContext } from "./TagSelectorContext";

const TagsContainer: React.FC = () => {
  const tagOptions = useTagSelectorContext(c => c.tagOptions);
  const editingIndex = useTagSelectorContext(c => c.editingIndex);
  const handleTagClick = useTagSelectorContext(c => c.handleTagClick);
  const handleDeleteTag = useTagSelectorContext(c => c.handleDeleteTag);

  return (
    <div className={styles.tagsContainer}>
      {tagOptions.map((tag, index) => (
        <div
          key={index}
          className={`${styles.tag} ${editingIndex === index ? styles.editing : ""}`}
          onClick={() => handleTagClick(index)}
        >
          <span className={styles.tagLabel}>{tag.label}</span>
          <button
            className={styles.deleteButton}
            onClick={e => {
              e.stopPropagation();
              handleDeleteTag(index);
            }}
            aria-label={`Delete ${tag.label} tag`}
          >
            <DeleteIcon width="12" height="12" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default memo(TagsContainer);
