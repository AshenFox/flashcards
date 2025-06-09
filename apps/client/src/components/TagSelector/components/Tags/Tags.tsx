import React, { memo } from "react";

import { useTagSelectorContext } from "../../TagSelectorContext";
import styles from "./styles.module.scss";
import Tag from "./Tag";

const Tags: React.FC = () => {
  const options = useTagSelectorContext(c => c.options);
  const editingIndex = useTagSelectorContext(c => c.editingIndex);
  const handleTagClick = useTagSelectorContext(c => c.handleTagClick);
  const handleDeleteTag = useTagSelectorContext(c => c.handleDeleteTag);

  return (
    <div className={styles.container}>
      {options.map((tag, index) => (
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

export default memo(Tags);
