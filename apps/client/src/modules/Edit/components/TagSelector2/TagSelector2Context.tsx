import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { SingleValue } from "react-select";

import {
  TagOption,
  TagSelector2ContextValue,
  TagSelector2ProviderProps,
} from "./types";

const TagSelector2Context = createContext<TagSelector2ContextValue | null>(
  null,
);

export const useTagSelector2Context = (): TagSelector2ContextValue => {
  const context = useContext(TagSelector2Context);
  if (!context) {
    throw new Error(
      "useTagSelector2Context must be used within a TagSelector2Provider",
    );
  }
  return context;
};

export const TagSelector2Provider: React.FC<TagSelector2ProviderProps> = ({
  children,
  tags,
  availableOptions,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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

  const handleInputChange = useCallback((value: string) => {
    console.log("handleInputChange called:", value);
    setInputValue(value);
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    console.log("handleKeyDown called:", event.key);
    if (event.key === "Escape") {
      setEditingIndex(null);
      setInputValue("");
    }
  }, []);

  const formatCreateLabel = useCallback((inputValue: string) => {
    return `Create "${inputValue}"`;
  }, []);

  const contextValue: TagSelector2ContextValue = {
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
    formatCreateLabel,
  };

  return (
    <TagSelector2Context.Provider value={contextValue}>
      {children}
    </TagSelector2Context.Provider>
  );
};
