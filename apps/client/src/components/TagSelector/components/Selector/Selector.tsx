import React, { memo, useCallback, useMemo, useState } from "react";
import { GroupBase, InputActionMeta } from "react-select";
import CreatableSelect from "react-select/creatable";
import { SelectComponents } from "react-select/dist/declarations/src/components";

import { useTagSelectorContext } from "../../TagSelectorContext";
import { TagOption } from "../../types";
import CustomInput from "./CustomInput";
import CustomOption from "./CustomOption";
import { customStyles } from "./customStyles";

interface SelectContainerProps {
  placeholder?: string;
  disabled?: boolean;
}

const SelectContainer: React.FC<SelectContainerProps> = ({
  disabled = false,
}) => {
  const editingIndex = useTagSelectorContext(c => c.editingIndex);
  const options = useTagSelectorContext(c => c.options);
  const selectOptions = useTagSelectorContext(c => c.selectOptions);
  const selectRef = useTagSelectorContext(c => c.selectRef);
  const inputRef = useTagSelectorContext(c => c.inputRef);
  const setInnerInputValueRef = useTagSelectorContext(
    c => c.setInnerInputValueRef,
  );
  const handleSelectChange = useTagSelectorContext(c => c.handleSelectChange);
  const handleCreateOption = useTagSelectorContext(c => c.handleCreateOption);
  const handleInputChange = useTagSelectorContext(c => c.handleInputChange);
  const handleKeyDown = useTagSelectorContext(c => c.handleKeyDown);
  const handleBlur = useTagSelectorContext(c => c.handleBlur);

  const [innerInputValue, setInnerInputValue] = useState("");

  // Connect the local setInnerInputValue to the context ref
  React.useEffect(() => {
    setInnerInputValueRef.current = setInnerInputValue;
  }, [setInnerInputValueRef]);
  const innerHandleInputChange = useCallback(
    (value: string, actionMeta: InputActionMeta) => {
      handleInputChange(value, actionMeta);
    },
    [handleInputChange],
  );

  const components = useMemo<
    Partial<SelectComponents<TagOption, false, GroupBase<TagOption>>>
  >(() => {
    return {
      DropdownIndicator: () => null,
      IndicatorSeparator: () => null,
      Option: CustomOption,
      Input: props => <CustomInput {...props} ref={inputRef} />,
    };
  }, [inputRef]);

  // Custom filter function to match from beginning of string
  const filterOption = useCallback((option: TagOption, inputValue: string) => {
    if (!inputValue.trim()) return true;

    // Convert both to lowercase for case-insensitive matching
    const optionValue = option.value.toLowerCase();
    const searchValue = inputValue.toLowerCase().trim();

    // Match from the beginning of the string
    return optionValue.startsWith(searchValue);
  }, []);

  // Dynamic placeholder based on editing state
  const dynamicPlaceholder =
    editingIndex !== null ? "Edit tag..." : "Add a tag...";

  // Only show menu when there's input text and when editing, only if the value has changed
  const shouldShowMenu =
    innerInputValue.trim().length > 0 &&
    (editingIndex === null || // Always show for new tags
      options[editingIndex]?.value !== innerInputValue.trim()); // Only show when editing if value changed

  return (
    <CreatableSelect
      ref={selectRef}
      value={null}
      onChange={handleSelectChange}
      onCreateOption={handleCreateOption}
      onInputChange={innerHandleInputChange}
      onBlur={handleBlur}
      inputValue={innerInputValue}
      options={selectOptions}
      filterOption={filterOption}
      placeholder={dynamicPlaceholder}
      isDisabled={disabled}
      isClearable={false}
      isSearchable={true}
      menuIsOpen={shouldShowMenu}
      autoFocus={false}
      menuShouldScrollIntoView={false}
      blurInputOnSelect={false}
      isOptionSelected={() => false}
      tabSelectsValue={false}
      closeMenuOnScroll={false}
      styles={customStyles}
      classNamePrefix="tag-selector"
      onKeyDown={handleKeyDown}
      noOptionsMessage={() => "Type to create a new tag"}
      formatCreateLabel={value => value}
      createOptionPosition="first"
      components={components}
    />
  );
};

export default memo(SelectContainer);
