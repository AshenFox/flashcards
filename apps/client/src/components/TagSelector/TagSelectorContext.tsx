import { axiosInstance } from "@flashcards/common";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [pendingCursorPos, setPendingCursorPos] = useState<number | null>(null);

  const selectRef =
    useRef<Select<TagOption, false, GroupBase<TagOption>>>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const setInnerInputValueRef = useRef<React.Dispatch<
    React.SetStateAction<string>
  > | null>(null);

  const setCommonInputValue = useCallback(
    (value: string, cursorPos?: number) => {
      setInputValue(value);
      setInnerInputValueRef.current?.(value);
      if (cursorPos !== undefined) setPendingCursorPos(cursorPos);
    },
    [],
  );

  // Effect to handle cursor positioning after input value changes
  useEffect(() => {
    if (pendingCursorPos !== null && inputRef.current) {
      inputRef.current.setSelectionRange(pendingCursorPos, pendingCursorPos);
      setPendingCursorPos(null);
    }
  }, [inputValue, pendingCursorPos]);

  // Convert string tags to options format
  const options = useMemo(
    () => tags.map(tag => ({ value: tag, label: tag })),
    [tags],
  );

  // Load options function for AsyncCreatableSelect
  const loadOptions = useCallback(
    async (inputValue: string): Promise<TagOption[]> => {
      try {
        if (!inputValue.trim()) {
          return [];
        }

        const { data } = await axiosInstance.get<{ tags: string[] }>(
          "/api/main/user/tags",
          {
            params: {
              search: inputValue.trim(),
            },
          },
        );

        // Convert tags to options format and filter out already selected tags
        return data.tags
          .filter(tag => !tags.includes(tag))
          .map(tag => ({ value: tag, label: tag }));
      } catch (err) {
        console.error("Error loading tags:", err);
        return [];
      }
    },
    [tags],
  );

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

        // Get current cursor position before transformations
        const currentCursorPos = inputRef.current?.selectionStart || 0;
        let cursorOffset = 0;

        // Replace spaces with ">" - this doesn't change cursor position
        processedValue = processedValue.replace(/ /g, ">");

        // Prevent multiple consecutive ">" and calculate cursor offset
        let newCursorPos = currentCursorPos;
        processedValue = processedValue.replace(/>+/g, (match, offset) => {
          // If consecutive ">" are before cursor, adjust cursor position
          if (offset < currentCursorPos) {
            const removedCount = match.length - 1; // How many extra ">" are removed
            cursorOffset += removedCount;

            // If cursor was within the consecutive ">" sequence, place it after the single ">"
            if (offset + match.length > currentCursorPos)
              newCursorPos = offset + 1;
          }
          return ">";
        });

        // Calculate final cursor position
        newCursorPos = Math.max(0, newCursorPos - cursorOffset);

        setCommonInputValue(
          processedValue,
          processedValue !== value ? newCursorPos : undefined,
        );
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

    // Handlers
    handleDeleteTag,
    handleTagClick,
    handleSelectChange,
    handleCreateOption,
    handleInputChange,
    handleKeyDown,
    handleBlur,
    loadOptions,

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
