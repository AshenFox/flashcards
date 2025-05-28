export interface TagOption {
  value: string;
  label: string;
  isEditing?: boolean;
}

export interface TagSelectorProps {
  initialTags?: TagOption[];
  availableTags?: TagOption[];
  onTagsChange?: (tags: TagOption[]) => void;
  placeholder?: string;
  isDisabled?: boolean;
}
