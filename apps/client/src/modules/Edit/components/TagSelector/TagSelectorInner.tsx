import React, { memo, useEffect } from "react";

import SelectContainer from "./SelectContainer";
import styles from "./styles.module.scss";
import TagsContainer from "./TagsContainer";
import { useTagSelectorContext } from "./TagSelectorContext";

interface TagSelectorInnerProps {
  placeholder?: string;
  disabled?: boolean;
}

const TagSelectorInner: React.FC<TagSelectorInnerProps> = ({
  placeholder = "Add a tag...",
  disabled = false,
}) => {
  const editingIndex = useTagSelectorContext(c => c.editingIndex);
  const selectRef = useTagSelectorContext(c => c.selectRef);

  // Focus the select when editing starts
  useEffect(() => {
    if (editingIndex !== null && selectRef.current) {
      selectRef.current.focus();
    }
  }, [editingIndex, selectRef]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Tags</h3>
      </div>

      <TagsContainer />

      <SelectContainer placeholder={placeholder} disabled={disabled} />
    </div>
  );
};

export default memo(TagSelectorInner);
