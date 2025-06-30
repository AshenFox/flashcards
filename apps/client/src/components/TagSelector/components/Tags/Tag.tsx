import { DeleteIcon } from "@ui/Icons";
import clsx from "clsx";
import React, { memo, MouseEventHandler, useCallback } from "react";

import styles from "./styles.module.scss";
import TagLabel from "./TagLabel";

interface TagProps {
  tag: { label: string };
  index: number;
  isEditing: boolean;
  disabled?: boolean;
  onTagClick: (index: number) => void;
  onDeleteTag: (index: number) => void;
}

const Tag: React.FC<TagProps> = ({
  tag,
  index,
  isEditing,
  disabled,
  onTagClick,
  onDeleteTag,
}) => {
  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    e => {
      if (disabled) return;

      e.stopPropagation();
      onTagClick(index);
    },
    [onTagClick, index, disabled],
  );

  return (
    <div
      className={clsx(
        styles.tag,
        isEditing && styles.editing,
        disabled && styles.disabled,
      )}
      onClick={handleClick}
    >
      <TagLabel label={tag.label} active={isEditing} />
      {!disabled && (
        <button
          className={styles.delete}
          disabled={disabled}
          onClick={e => {
            e.stopPropagation();
            onDeleteTag(index);
          }}
          aria-label={`Delete ${tag.label} tag`}
        >
          <DeleteIcon width="12" height="12" />
        </button>
      )}
    </div>
  );
};

export default memo(Tag);
