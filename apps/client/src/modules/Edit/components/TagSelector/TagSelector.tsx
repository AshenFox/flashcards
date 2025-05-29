import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { ActionMeta, MultiValue, MultiValueProps } from "react-select";
import CreatableSelect from "react-select/creatable";

import { customStyles } from "./customStyles";
import EditableMultiValue from "./EditableMultiValue";
import {
  TagSelectorProvider,
  useTagSelectorContext,
} from "./TagSelectorContext";
import { TagOption, TagSelectorProps } from "./types";

const TagSelectorInner: React.FC<Omit<TagSelectorProps, "onTagsChange">> = ({
  availableTags = [],
  placeholder = "Select or create tags...",
  isDisabled = false,
}) => {
  const { selectedTags, setSelectedTags, selectRef } = useTagSelectorContext();

  const handleSelectChange = useCallback(
    (newValue: MultiValue<TagOption>, actionMeta: ActionMeta<TagOption>) => {
      const updatedTags = Array.from(newValue) as TagOption[];
      setSelectedTags(updatedTags);
    },
    [setSelectedTags],
  );

  const handleCreateOption = useCallback(
    (inputValue: string) => {
      const newTag: TagOption = {
        value: inputValue.toLowerCase().replace(/\s+/g, "-"),
        label: inputValue.trim(),
      };
      const updatedTags = [...selectedTags, newTag];
      setSelectedTags(updatedTags);
    },
    [selectedTags, setSelectedTags],
  );

  // Combine available tags with selected tags, avoiding duplicates
  const allOptions = [
    ...availableTags.filter(
      tag => !selectedTags.some(selected => selected.value === tag.value),
    ),
  ];

  // Since EditableMultiValue now uses context, we don't need to pass any editing-related props
  const components = useMemo(() => {
    return {
      MultiValue: EditableMultiValue,
    };
  }, []); // Empty dependencies since we don't need to recreate this

  return (
    <div className="tag-selector">
      <CreatableSelect
        isMulti
        value={selectedTags}
        onChange={handleSelectChange}
        options={allOptions}
        components={components}
        styles={customStyles}
        placeholder={placeholder}
        isDisabled={isDisabled}
        onCreateOption={handleCreateOption}
        formatCreateLabel={inputValue => `Create tag: "${inputValue}"`}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        className="tag-selector__select"
        classNamePrefix="tag-selector"
        openMenuOnClick={false}
        ref={selectRef}
      />
    </div>
  );
};

const TagSelector: React.FC<TagSelectorProps> = ({
  initialTags = [],
  onTagsChange,
  ...props
}) => {
  return (
    <TagSelectorProvider onTagsChange={onTagsChange} initialTags={initialTags}>
      <TagSelectorInner {...props} />
    </TagSelectorProvider>
  );
};

export default memo(TagSelector);
