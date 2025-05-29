import React, { useLayoutEffect, useRef } from "react";
import { components, MultiValueProps } from "react-select";

import { TagOption } from "./types";

interface EditableMultiValueProps extends MultiValueProps<TagOption> {
  editingTagIndex: number | null;
  editingTagValue: string;
  selectedTags: TagOption[];
  onEditStart: (index: number, label: string) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onEditValueChange: (value: string) => void;
}

const EditableMultiValue: React.FC<EditableMultiValueProps> = ({
  data,
  index,
  editingTagIndex,
  editingTagValue,
  selectedTags,
  onEditStart,
  onEditSave,
  onEditCancel,
  onEditValueChange,
  ...props
}) => {
  const editInputRef = useRef<HTMLInputElement>(null);
  const isEditing = editingTagIndex === index;

  useLayoutEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEditStart(index, data.label);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      onEditSave();
    } else if (e.key === "Escape") {
      onEditCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="tag-selector__multi-value tag-selector__multi-value--editing">
        <input
          ref={editInputRef}
          type="text"
          value={editingTagValue}
          onChange={e => onEditValueChange(e.target.value)}
          onBlur={onEditSave}
          onKeyDown={handleKeyDown}
          className="tag-selector__edit-input"
        />
      </div>
    );
  }

  return (
    <components.MultiValue {...props} data={data} index={index}>
      <div
        className="tag-selector__multi-value-wrapper"
        onMouseDown={handleMouseDown}
        onClick={handleEditStart}
        onTouchStart={handleEditStart}
      >
        <components.MultiValueLabel {...props} data={data} />
      </div>
    </components.MultiValue>
  );
};

export default EditableMultiValue;
