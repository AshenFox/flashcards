import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { GroupBase, InputActionMeta, SingleValue } from "react-select";
import Select from "react-select/dist/declarations/src/Select";

import {
  TagOption,
  TagSelectorContextValue,
  TagSelectorProviderProps,
} from "./types";

const TagSelectorContext = createContext<TagSelectorContextValue | null>(null);

export const useTagSelectorContext = (): TagSelectorContextValue => {
  const context = useContext(TagSelectorContext);
  if (!context) {
    throw new Error(
      "useTagSelectorContext must be used within a TagSelectorProvider",
    );
  }
  return context;
};

export const TagSelectorProvider: React.FC<TagSelectorProviderProps> = ({
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

  // Convert string tags to options format
  const tagOptions = useMemo(
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
        setInputValue("");
      }
    },
    [tags, onChange, editingIndex],
  );

  const handleTagClick = useCallback(
    (index: number) => {
      setEditingIndex(index);
      setInputValue(tags[index]);
    },
    [tags],
  );

  const handleSelectChange = useCallback(
    (selectedOption: SingleValue<TagOption>) => {
      console.log("handleSelectChange called:", selectedOption);
      if (!selectedOption) return;

      if (editingIndex !== null) {
        // Edit existing tag
        const newTags = [...tags];
        newTags[editingIndex] = selectedOption.value;
        onChange?.(newTags);
        setEditingIndex(null);
      } else {
        // Add new tag
        const newTags = [...tags, selectedOption.value];
        onChange?.(newTags);
      }
      setInputValue("");
    },
    [tags, editingIndex, onChange],
  );

  const handleCreateOption = useCallback(
    (inputValue: string) => {
      console.log("handleCreateOption called:", inputValue);
      const trimmedValue = inputValue.trim();
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
      setInputValue("");
    },
    [tags, editingIndex, onChange],
  );

  const handleInputChange = useCallback(
    (value: string, actionMeta: InputActionMeta) => {
      console.log(
        "handleInputChange called:",
        value,
        actionMeta,
        inputRef.current?.selectionStart,
      );

      // First, replace spaces with "::" automatically
      let processedValue = value.replace(/ /g, "::");

      setInputValue(processedValue);
    },
    [],
  );

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    console.log("handleKeyDown called:", event.key);
    if (event.key === "Escape") {
      setEditingIndex(null);
      setInputValue("");
    }
  }, []);

  const handleBlur = useCallback(() => {
    console.log("handleBlur called");
    // Clear editing state when select loses focus
    setEditingIndex(null);
    setInputValue("");
  }, []);

  const formatCreateLabel = useCallback(
    (inputValue: string) => {
      if (editingIndex !== null) {
        return `Update to "${inputValue}"`;
      }
      return `Create "${inputValue}"`;
    },
    [editingIndex],
  );

  const contextValue: TagSelectorContextValue = {
    // State
    inputValue,
    editingIndex,
    tagOptions,
    selectOptions,

    // Handlers
    handleDeleteTag,
    handleTagClick,
    handleSelectChange,
    handleCreateOption,
    handleInputChange,
    handleKeyDown,
    handleBlur,
    formatCreateLabel,

    // Refs
    selectRef,
    inputRef,
  };

  return (
    <TagSelectorContext.Provider value={contextValue}>
      {children}
    </TagSelectorContext.Provider>
  );
};
