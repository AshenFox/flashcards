import React, { memo, useCallback, useMemo } from "react";
import {
  ActionMeta,
  components as componentsRS,
  GroupBase,
  MultiValue,
} from "react-select";
import CreatableSelect from "react-select/creatable";
import { SelectComponents } from "react-select/dist/declarations/src/components";

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
  const { selectedTags, setSelectedTags, selectRef, editingTagIndex } =
    useTagSelectorContext();

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
  const components = useMemo<
    Partial<SelectComponents<TagOption, boolean, GroupBase<TagOption>>>
  >(() => {
    return {
      MultiValue: EditableMultiValue,
      Input: ({ innerRef, selectProps, onFocus, onTouchStart, ...props }) => {
        // Check if any tag is currently being edited

        const isTagBeingEdited = editingTagIndex !== null;

        // Custom event handlers to prevent focus conflicts
        const handleFocus = useCallback(
          (e: React.FocusEvent<HTMLInputElement>) => {
            // If a tag is being edited, prevent the input from gaining focus
            if (isTagBeingEdited) {
              e.preventDefault();
              (e.target as HTMLInputElement).blur();
              return;
            }
            // Otherwise, call the original onFocus if it exists
            if (onFocus) {
              onFocus(e);
            }
          },
          [isTagBeingEdited, onFocus],
        );

        const handleTouchStart = useCallback(
          (e: React.TouchEvent<HTMLInputElement>) => {
            // If a tag is being edited, prevent touch events on the input
            if (isTagBeingEdited) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }
            // Otherwise, call the original handler if it exists
            if (onTouchStart) {
              onTouchStart(e);
            }
          },
          [isTagBeingEdited, onTouchStart],
        );

        return (
          <componentsRS.Input
            {...props}
            innerRef={innerRef}
            selectProps={selectProps}
            onFocus={handleFocus}
            // onTouchStart={handleTouchStart}
          />
        );
      },
    };
  }, [editingTagIndex]); // Re-create when editing state changes

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
        blurInputOnSelect={false}
        openMenuOnFocus={false}
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
