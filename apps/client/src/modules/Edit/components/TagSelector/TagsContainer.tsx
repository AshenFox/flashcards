import React, { memo } from "react";

import styles from "./styles.module.scss";
import Tag from "./Tag";
import { useTagSelectorContext } from "./TagSelectorContext";

const TagsContainer: React.FC = () => {
  const tagOptions = useTagSelectorContext(c => c.tagOptions);
  const editingIndex = useTagSelectorContext(c => c.editingIndex);
  const handleTagClick = useTagSelectorContext(c => c.handleTagClick);
  const handleDeleteTag = useTagSelectorContext(c => c.handleDeleteTag);

  return (
    <div className={styles.tagsContainer}>
      {tagOptions.map((tag, index) => (
        <Tag
          key={index}
          tag={tag}
          index={index}
          isEditing={editingIndex === index}
          onTagClick={handleTagClick}
          onDeleteTag={handleDeleteTag}
        />
      ))}
    </div>
  );
};

export default memo(TagsContainer);
