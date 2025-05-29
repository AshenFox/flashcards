import { SingleValue } from "react-select";

export interface TagOption {
  value: string;
  label: string;
}

export interface TagSelector2Props {
  tags?: string[];
  availableOptions?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export interface TagsContainerProps {
  tags: TagOption[];
  editingIndex: number | null;
  disabled?: boolean;
  onTagClick: (index: number) => void;
  onDeleteTag: (index: number) => void;
}

export interface TagSelector2ContextValue {
  // State
  inputValue: string;
  editingIndex: number | null;
  tagOptions: TagOption[];
  selectOptions: TagOption[];

  // Handlers
  handleDeleteTag: (index: number) => void;
  handleTagClick: (index: number) => void;
  handleSelectChange: (selectedOption: SingleValue<TagOption>) => void;
  handleCreateOption: (inputValue: string) => void;
  handleInputChange: (value: string) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  formatCreateLabel: (inputValue: string) => string;
}

export interface TagSelector2ProviderProps {
  children: React.ReactNode;
  tags: string[];
  availableOptions: string[];
  onChange?: (tags: string[]) => void;
}
