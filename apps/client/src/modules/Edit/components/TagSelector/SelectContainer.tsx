import React, { forwardRef, memo, useCallback, useMemo } from "react";
import { components as rsComponents, GroupBase } from "react-select";
import CreatableSelect from "react-select/creatable";
import { SelectComponents } from "react-select/dist/declarations/src/components";

import { customStyles } from "./customStyles";
import styles from "./styles.module.scss";
import { useTagSelectorContext } from "./TagSelectorContext";
import { TagOption } from "./types";

interface SelectContainerProps {
  placeholder?: string;
  disabled?: boolean;
}

export const useMergeRefs = (
  ...refs: (
    | ((instance: HTMLInputElement | null) => void)
    | React.MutableRefObject<any>
  )[]
): ((instance: HTMLInputElement | null) => void) => {
  return useCallback(
    node => {
      refs.forEach(ref => {
        if (typeof ref === "function") ref(node);
        else ref.current = node;
      });
    },
    [refs],
  );
};

const CustomInput = forwardRef<HTMLInputElement, any>((props, ref) => {
  const mergedRef = useMergeRefs(ref, props.innerRef);
  return (
    <rsComponents.Input {...props} enterKeyHint="enter" innerRef={mergedRef} />
  );
});

CustomInput.displayName = "CustomInput";

const SelectContainer: React.FC<SelectContainerProps> = ({
  placeholder = "Add a tag...",
  disabled = false,
}) => {
  const inputValue = useTagSelectorContext(c => c.inputValue);
  const editingIndex = useTagSelectorContext(c => c.editingIndex);
  const tagOptions = useTagSelectorContext(c => c.tagOptions);
  const selectOptions = useTagSelectorContext(c => c.selectOptions);
  const selectRef = useTagSelectorContext(c => c.selectRef);
  const inputRef = useTagSelectorContext(c => c.inputRef);
  const handleSelectChange = useTagSelectorContext(c => c.handleSelectChange);
  const handleCreateOption = useTagSelectorContext(c => c.handleCreateOption);
  const handleInputChange = useTagSelectorContext(c => c.handleInputChange);
  const handleKeyDown = useTagSelectorContext(c => c.handleKeyDown);
  const handleBlur = useTagSelectorContext(c => c.handleBlur);
  const formatCreateLabel = useTagSelectorContext(c => c.formatCreateLabel);

  const components = useMemo<
    Partial<SelectComponents<TagOption, false, GroupBase<TagOption>>>
  >(() => {
    return {
      DropdownIndicator: () => null,
      IndicatorSeparator: () => null,
      Input: props => {
        return <CustomInput {...props} ref={inputRef} />;
      },
    };
  }, [inputRef]);

  // Dynamic placeholder based on editing state
  const dynamicPlaceholder =
    editingIndex !== null ? "Edit tag..." : placeholder;

  // Only show menu when there's input text and when editing, only if the value has changed
  const shouldShowMenu =
    inputValue.trim().length > 0 &&
    (editingIndex === null || // Always show for new tags
      tagOptions[editingIndex]?.value !== inputValue.trim()); // Only show when editing if value changed

  return (
    <div className={styles.selectContainer}>
      <CreatableSelect
        ref={selectRef}
        value={null}
        onChange={handleSelectChange}
        onCreateOption={handleCreateOption}
        onInputChange={handleInputChange}
        onBlur={handleBlur}
        inputValue={inputValue}
        options={selectOptions}
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
        className={styles.select}
        classNamePrefix="tag-selector"
        onKeyDown={handleKeyDown}
        noOptionsMessage={() => "Type to create a new tag"}
        formatCreateLabel={formatCreateLabel}
        createOptionPosition="first"
        components={components}
      />
    </div>
  );
};

export default memo(SelectContainer);
