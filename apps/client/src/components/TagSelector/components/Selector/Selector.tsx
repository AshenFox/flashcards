import React, { memo, useCallback, useMemo, useState } from "react";
import { GroupBase, InputActionMeta } from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";
import { SelectComponents } from "react-select/dist/declarations/src/components";

import { useTagSelectorContext } from "../../TagSelectorContext";
import { TagOption } from "../../types";
import CustomInput from "./CustomInput";
import CustomOption from "./CustomOption";
import { customStyles } from "./customStyles";

const SelectContainer: React.FC = () => {
  const disabled = useTagSelectorContext(c => c.disabled);
  const editingIndex = useTagSelectorContext(c => c.editingIndex);
  const options = useTagSelectorContext(c => c.options);
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
  const loadOptions = useTagSelectorContext(c => c.loadOptions);

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

  // Dynamic placeholder based on editing state
  const dynamicPlaceholder = disabled
    ? ""
    : editingIndex !== null
      ? "Edit tag..."
      : "Add a tag...";

  // Only show menu when there's input text and when editing, only if the value has changed
  const shouldShowMenu =
    innerInputValue.trim().length > 0 &&
    (editingIndex === null || // Always show for new tags
      options[editingIndex]?.value !== innerInputValue.trim()); // Only show when editing if value changed

  return (
    <AsyncCreatableSelect
      ref={selectRef}
      value={null}
      onChange={handleSelectChange}
      onCreateOption={handleCreateOption}
      onInputChange={innerHandleInputChange}
      onBlur={handleBlur}
      inputValue={innerInputValue}
      loadOptions={loadOptions}
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
      cacheOptions
      defaultOptions={false}
    />
  );
};

export default memo(SelectContainer);
