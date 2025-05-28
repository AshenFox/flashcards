import React, { useEffect, useRef, useState } from "react";
import {
  ActionMeta,
  components,
  MultiValue,
  MultiValueGenericProps,
  MultiValueProps,
} from "react-select";
import CreatableSelect from "react-select/creatable";

import EditableMultiValue from "./EditableMultiValue";
import { TagOption, TagSelectorProps } from "./types";

const TagSelector: React.FC<TagSelectorProps> = ({
  initialTags = [],
  availableTags = [],
  onTagsChange,
  placeholder = "Select or create tags...",
  isDisabled = false,
}) => {
  const [selectedTags, setSelectedTags] = useState<TagOption[]>(initialTags);
  const [editingTagValue, setEditingTagValue] = useState<string>("");
  const [editingTagIndex, setEditingTagIndex] = useState<number | null>(null);

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
    ...selectedTags,
  ];

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight: "40px",
      border: state.isFocused ? "2px solid #007bff" : "1px solid #ccc",
      borderRadius: "6px",
      boxShadow: state.isFocused ? "0 0 0 1px #007bff" : "none",
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#e3f2fd",
      border: "1px solid #bbdefb",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: "#bbdefb",
      },
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#1976d2",
      fontWeight: "500",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: "#1976d2",
      "&:hover": {
        backgroundColor: "#f44336",
        color: "white",
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#999",
      fontStyle: "italic",
    }),
  };

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
      />
    </div>
  );
};

export default TagSelector;
