import { GroupBase, InputActionMeta, SingleValue } from "react-select";
import Select from "react-select/dist/declarations/src/Select";

export interface TagOption {
  value: string;
  label: string;
  __isNew__?: boolean;
}

export interface TagSelectorProps {
  tags?: string[];
  availableOptions?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export interface TagSelectorContextValue {
  // State
  inputValue: string;
  editingIndex: number | null;
  options: TagOption[];
  selectOptions: TagOption[];

  // Handlers
  handleDeleteTag: (index: number) => void;
  handleTagClick: (index: number) => void;
  handleSelectChange: (selectedOption: SingleValue<TagOption>) => void;
  handleCreateOption: (inputValue: string) => void;
  handleInputChange: (value: string, actionMeta: InputActionMeta) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  handleBlur: () => void;

  // Refs
  selectRef: React.RefObject<Select<TagOption, false, GroupBase<TagOption>>>;
  inputRef: React.RefObject<HTMLInputElement>;
  setInnerInputValueRef: React.MutableRefObject<React.Dispatch<
    React.SetStateAction<string>
  > | null>;
}

export interface TagSelectorProviderProps {
  children: React.ReactNode;
  tags: string[];
  availableOptions: string[];
  onChange?: (tags: string[]) => void;
}
