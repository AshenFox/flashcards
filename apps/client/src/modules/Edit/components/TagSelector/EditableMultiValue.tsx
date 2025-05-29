import React, { memo, useCallback, useLayoutEffect, useRef } from "react";
import { components, MultiValueProps } from "react-select";

import { useTagSelectorContext } from "./TagSelectorContext";
import { TagOption } from "./types";

interface EditableMultiValueProps extends MultiValueProps<TagOption> {
  // Remove the editing-related props since they'll come from context
}

const EditableMultiValue: React.FC<EditableMultiValueProps> = ({
  data,
  index,
  ...props
}) => {
  const {
    editingTagIndex,
    editingTagValue,
    handleEditStart,
    handleEditSave,
    handleEditCancel,
    handleEditValueChange,
  } = useTagSelectorContext();

  const editInputRef = useRef<HTMLInputElement>(null);
  const isEditing = editingTagIndex === index;

  useLayoutEffect(() => {
    if (isEditing && editInputRef.current) {
      // editInputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEditStartCallback = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      handleEditStart(index, data.label);
    },
    [index, data.label, handleEditStart],
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleEditStartCallback(e);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only handle click if it's not a touch device
    // Touch devices will handle via touchstart
    if (!("ontouchstart" in window)) {
      handleEditStartCallback(e);
    }
  };

  const handleBlur = useCallback(() => {
    handleEditSave();
  }, [handleEditSave]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();

    if (e.key === "Enter") {
      e.preventDefault();
      handleEditSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleEditCancel();
    }
  };

  if (isEditing) {
    return (
      <components.MultiValue {...props} data={data} index={index}>
        <div className="tag-selector__multi-value tag-selector__multi-value--editing">
          <input
            ref={editInputRef}
            type="text"
            value={editingTagValue}
            onChange={e => handleEditValueChange(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="tag-selector__edit-input"
          />
        </div>
      </components.MultiValue>
    );
  }

  return (
    <components.MultiValue {...props} data={data} index={index}>
      <div
        className="tag-selector__multi-value-wrapper"
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
      >
        <components.MultiValueLabel {...props} data={data} />
      </div>
    </components.MultiValue>
  );
};

export default memo(EditableMultiValue);
