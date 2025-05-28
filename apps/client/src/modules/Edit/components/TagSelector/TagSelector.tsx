import React, { useEffect, useRef, useState } from "react";
import { ActionMeta, MultiValue, MultiValueProps } from "react-select";
import CreatableSelect from "react-select/creatable";

import { customStyles } from "./customStyles";
import EditableMultiValue from "./EditableMultiValue";
import { TagOption, TagSelectorProps } from "./types";

const TagSelector: React.FC<TagSelectorProps> = ({
  initialTags = [],
  availableTags = [],
  onTagsChange,
  placeholder = "Select or create tags...",
  isDisabled = false,
}) => {
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([
    { value: "somerandomtag1", label: "Some Random Tag 1" },
    { value: "somerandomtag2", label: "Some Random Tag 2" },
    { value: "somerandomtag3", label: "Some Random Tag 3" },
  ]);
  const [editingTagValue, setEditingTagValue] = useState<string>("");
  const [editingTagIndex, setEditingTagIndex] = useState<number | null>(null);
  const [forceMenuOpen, setForceMenuOpen] = useState<boolean | undefined>(
    undefined,
  );

  const handleEditStart = (index: number, label: string) => {
    setEditingTagIndex(index);
    setEditingTagValue(label);
  };

  const handleEditSave = () => {
    if (
      editingTagValue.trim() &&
      editingTagIndex !== null &&
      editingTagValue !== selectedTags[editingTagIndex]?.label
    ) {
      const updatedTags = [...selectedTags];
      updatedTags[editingTagIndex] = {
        ...updatedTags[editingTagIndex],
        label: editingTagValue.trim(),
        value: editingTagValue.trim().toLowerCase().replace(/\s+/g, "-"),
      };
      setSelectedTags(updatedTags);
      onTagsChange?.(updatedTags);
    }
    setEditingTagIndex(null);
    setEditingTagValue("");
  };

  const handleEditCancel = () => {
    setEditingTagIndex(null);
    setEditingTagValue("");
  };

  const handleEditValueChange = (value: string) => {
    setEditingTagValue(value);
  };

  const handleSelectChange = (
    newValue: MultiValue<TagOption>,
    actionMeta: ActionMeta<TagOption>,
  ) => {
    const updatedTags = Array.from(newValue) as TagOption[];
    setSelectedTags(updatedTags);
    onTagsChange?.(updatedTags);
  };

  const handleCreateOption = (inputValue: string) => {
    const newTag: TagOption = {
      value: inputValue.toLowerCase().replace(/\s+/g, "-"),
      label: inputValue.trim(),
    };
    const updatedTags = [...selectedTags, newTag];
    setSelectedTags(updatedTags);
    onTagsChange?.(updatedTags);
  };

  // Combine available tags with selected tags, avoiding duplicates
  const allOptions = [
    ...availableTags.filter(
      tag => !selectedTags.some(selected => selected.value === tag.value),
    ),
    // ...selectedTags,
  ];

  return (
    <div className="tag-selector">
      <CreatableSelect
        isMulti
        value={selectedTags}
        onChange={handleSelectChange}
        options={allOptions}
        components={{
          MultiValue: (props: MultiValueProps<TagOption>) => (
            <EditableMultiValue
              {...props}
              editingTagIndex={editingTagIndex}
              editingTagValue={editingTagValue}
              selectedTags={selectedTags}
              onEditStart={handleEditStart}
              onEditSave={handleEditSave}
              onEditCancel={handleEditCancel}
              onEditValueChange={handleEditValueChange}
            />
          ),
        }}
        styles={customStyles}
        placeholder={placeholder}
        isDisabled={isDisabled}
        onCreateOption={handleCreateOption}
        formatCreateLabel={inputValue => `Create tag: "${inputValue}"`}
        noOptionsMessage={() => "Type to create a new tag"}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        className="tag-selector__select"
        classNamePrefix="tag-selector"
        menuIsOpen={forceMenuOpen}
      />
    </div>
  );
};

export default TagSelector;
