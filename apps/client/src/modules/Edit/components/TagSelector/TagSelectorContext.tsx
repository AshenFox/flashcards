import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

import { TagOption } from "./types";

interface TagSelectorContextValue {
  selectedTags: TagOption[];
  editingTagValue: string;
  editingTagIndex: number | null;
  selectRef: React.RefObject<any>;
  handleEditStart: (index: number, label: string) => void;
  handleEditSave: () => void;
  handleEditCancel: () => void;
  handleEditValueChange: (value: string) => void;
  setSelectedTags: (tags: TagOption[]) => void;
}

const TagSelectorContext = createContext<TagSelectorContextValue | null>(null);

export const useTagSelectorContext = () => {
  const context = useContext(TagSelectorContext);
  if (!context) {
    throw new Error(
      "useTagSelectorContext must be used within a TagSelectorProvider",
    );
  }
  return context;
};

interface TagSelectorProviderProps {
  children: ReactNode;
  onTagsChange?: (tags: TagOption[]) => void;
  initialTags?: TagOption[];
}

export const TagSelectorProvider: React.FC<TagSelectorProviderProps> = ({
  children,
  onTagsChange,
  initialTags = [],
}) => {
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([
    { value: "somerandomtag1", label: "Some Random Tag 1" },
    { value: "somerandomtag2", label: "Some Random Tag 2" },
    { value: "somerandomtag3", label: "Some Random Tag 3" },
  ]);
  const [editingTagValue, setEditingTagValue] = useState<string>("");
  const [editingTagIndex, setEditingTagIndex] = useState<number | null>(null);
  const selectRef = useRef<any>(null);

  const handleEditStart = useCallback((index: number, label: string) => {
    setEditingTagIndex(index);
    setEditingTagValue(label);
    // Blur the select input to prevent focus conflicts
    setTimeout(() => {
      if (selectRef.current) selectRef.current.blur();
    }, 0);
  }, []);

  const handleEditSave = useCallback(() => {
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
  }, [editingTagValue, editingTagIndex, selectedTags, onTagsChange]);

  const handleEditCancel = useCallback(() => {
    setEditingTagIndex(null);
    setEditingTagValue("");
  }, []);

  const handleEditValueChange = useCallback((value: string) => {
    setEditingTagValue(value);
  }, []);

  const handleSetSelectedTags = useCallback(
    (tags: TagOption[]) => {
      setSelectedTags(tags);
      onTagsChange?.(tags);
    },
    [onTagsChange],
  );

  const contextValue: TagSelectorContextValue = {
    selectedTags,
    editingTagValue,
    editingTagIndex,
    selectRef,
    handleEditStart,
    handleEditSave,
    handleEditCancel,
    handleEditValueChange,
    setSelectedTags: handleSetSelectedTags,
  };

  return (
    <TagSelectorContext.Provider value={contextValue}>
      {children}
    </TagSelectorContext.Provider>
  );
};
