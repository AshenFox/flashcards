import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { GroupBase, InputActionMeta, SingleValue } from "react-select";
import Select from "react-select/dist/declarations/src/Select";
import { createContext, useContextSelector } from "use-context-selector";

import {
  TagOption,
  TagSelectorContextValue,
  TagSelectorProviderProps,
} from "./types";

export const TagSelectorContext = createContext<TagSelectorContextValue | null>(
  null,
);

export const useTagSelectorContext = <Selected,>(
  selector: (context: TagSelectorContextValue) => Selected,
): Selected => useContextSelector(TagSelectorContext, selector);

const TagSelectorProvider: React.FC<TagSelectorProviderProps> = ({
  children,
  tags,
  availableOptions,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const selectRef =
    useRef<Select<TagOption, false, GroupBase<TagOption>>>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const setInnerInputValueRef = useRef<React.Dispatch<
    React.SetStateAction<string>
  > | null>(null);

  const setCommonInputValue = useCallback((value: string) => {
    setInputValue(value);
    setInnerInputValueRef.current?.(value);
  }, []);

  // Convert string tags to options format
  const options = useMemo(
    () => tags.map(tag => ({ value: tag, label: tag })),
    [tags],
  );

  // Convert available options to select format and filter out already selected tags
  const selectOptions = useMemo(() => {
    return availableOptions
      .filter(option => !tags.includes(option)) // Remove already selected tags
      .map(option => ({ value: option, label: option }));
  }, [availableOptions, tags]);

  const handleDeleteTag = useCallback(
    (index: number) => {
      const newTags = tags.filter((_, i) => i !== index);
      onChange?.(newTags);
      // If we were editing this tag, clear the edit state
      if (editingIndex === index) {
        setEditingIndex(null);
        setCommonInputValue("");
      }
    },
    [tags, onChange, editingIndex, setCommonInputValue],
  );

  const handleTagClick = useCallback(
    (index: number) => {
      setEditingIndex(index);
      setCommonInputValue(tags[index]);
    },
    [tags, setCommonInputValue],
  );

  const handleSelectChange = useCallback(
    (selectedOption: SingleValue<TagOption>) => {
      if (!selectedOption) return;

      // Clean the selected value by removing > from start and end
      const cleanValue = selectedOption.value.replace(/^>+|>+$/g, "");
      if (!cleanValue) return;

      if (editingIndex !== null) {
        // Edit existing tag
        const newTags = [...tags];
        newTags[editingIndex] = cleanValue;
        onChange?.(newTags);
        setEditingIndex(null);
      } else {
        // Add new tag
        const newTags = [...tags, cleanValue];
        onChange?.(newTags);
      }
      setCommonInputValue("");
    },
    [tags, editingIndex, onChange, setCommonInputValue],
  );

  const handleCreateOption = useCallback(
    (inputValue: string) => {
      const trimmedValue = inputValue.trim().replace(/^>+|>+$/g, ""); // Remove > from start and end
      if (!trimmedValue) return;

      if (editingIndex !== null) {
        // Edit existing tag
        const newTags = [...tags];
        newTags[editingIndex] = trimmedValue;
        onChange?.(newTags);
        setEditingIndex(null);
      } else {
        // Add new tag (avoid duplicates)
        if (!tags.includes(trimmedValue)) {
          const newTags = [...tags, trimmedValue];
          onChange?.(newTags);
        }
      }
      setCommonInputValue("");
    },
    [tags, editingIndex, onChange, setCommonInputValue],
  );

  const handleInputChange = useCallback(
    (value: string, actionMeta: InputActionMeta) => {
      // Only process user input, not programmatic changes
      if (actionMeta.action === "input-change") {
        let processedValue = value;

        // Replace spaces with ">"
        processedValue = processedValue.replace(/ /g, ">");

        // Prevent multiple consecutive ">" (more than 1 in a row)
        processedValue = processedValue.replace(/>+/g, ">");

        setCommonInputValue(processedValue);
      } else {
        setCommonInputValue(value);
      }
    },
    [setCommonInputValue],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        setEditingIndex(null);
        setCommonInputValue("");
      }
    },
    [setCommonInputValue],
  );

  const handleBlur = useCallback(() => {
    // Clear editing state when select loses focus
    setEditingIndex(null);
    setCommonInputValue("");
  }, [setCommonInputValue]);

  const contextValue: TagSelectorContextValue = {
    // State
    inputValue,
    editingIndex,
    options,
    selectOptions,

    // Handlers
    handleDeleteTag,
    handleTagClick,
    handleSelectChange,
    handleCreateOption,
    handleInputChange,
    handleKeyDown,
    handleBlur,

    // Refs
    selectRef,
    inputRef,
    setInnerInputValueRef,
  };

  return (
    <TagSelectorContext.Provider value={contextValue}>
      {children}
    </TagSelectorContext.Provider>
  );
};

export default memo(TagSelectorProvider);
