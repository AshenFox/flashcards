import { GroupBase, InputActionMeta, SingleValue } from "react-select";
import Select from "react-select/dist/declarations/src/Select";

export interface TagOption {
  value: string;
  label: string;
  __isNew__?: boolean;
}

export interface TagSelectorProps {
  tags?: string[];
  onChange?: (tags: string[]) => void;
  disabled?: boolean;
}

export interface TagSelectorContextValue {
  // State
  inputValue: string;
  editingIndex: number | null;
  options: TagOption[];
  disabled: boolean;

  // Handlers
  handleDeleteTag: (index: number) => void;
  handleTagClick: (index: number) => void;
  handleSelectChange: (selectedOption: SingleValue<TagOption>) => void;
  handleCreateOption: (inputValue: string) => void;
  handleInputChange: (value: string, actionMeta: InputActionMeta) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  handleBlur: () => void;
  loadOptions: (inputValue: string) => Promise<TagOption[]>;

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
  disabled?: boolean;
  onChange?: (tags: string[]) => void;
}
