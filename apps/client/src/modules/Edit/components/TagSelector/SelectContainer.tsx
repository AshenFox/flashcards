import React, { forwardRef, memo, useCallback, useMemo } from "react";
import {
  components as rsComponents,
  GroupBase,
  OptionProps,
} from "react-select";
import CreatableSelect from "react-select/creatable";
import { SelectComponents } from "react-select/dist/declarations/src/components";

import { customStyles } from "./customStyles";
import styles from "./styles.module.scss";
import TagPart from "./TagPart";
import { useTagSelectorContext } from "./TagSelectorContext";
import { TagOption } from "./types";

interface SelectContainerProps {
  placeholder?: string;
  disabled?: boolean;
}

export const useMergedRef = <T,>(
  ...refs: (((instance: T | null) => void) | React.MutableRefObject<T>)[]
): ((instance: T | null) => void) => {
  return useCallback(
    node =>
      refs.forEach(ref => {
        if (typeof ref === "function") ref(node);
        else ref.current = node;
      }),
    [refs],
  );
};

const CustomInput = forwardRef<HTMLInputElement, any>((props, ref) => {
  const mergedRef = useMergedRef<HTMLInputElement>(ref, props.innerRef);
  return (
    <rsComponents.Input {...props} enterKeyHint="enter" innerRef={mergedRef} />
  );
});

CustomInput.displayName = "CustomInput";

const CustomOption: React.ComponentType<
  OptionProps<TagOption, false, GroupBase<TagOption>>
> = props => {
  const { data } = props;

  const editingIndex = useTagSelectorContext(c => c.editingIndex);

  // Split the option label by ">" and filter out empty parts
  const tagParts = data.label
    .split(">")
    .map((part: string) => part.trim())
    .filter((part: string) => part.length > 0);

  return (
    <rsComponents.Option {...props}>
      <div className={styles.tagLabel}>
        {data?.__isNew__ && (
          <span className={styles.tagCreate}>
            {editingIndex !== null ? "Update to" : "Create"}:
          </span>
        )}
        {tagParts.map((part: string, partIndex: number) => (
          <TagPart
            key={partIndex}
            part={part}
            showSeparator={partIndex < tagParts.length - 1}
            active={props.isFocused}
          />
        ))}
      </div>
    </rsComponents.Option>
  );
};

const SelectContainer: React.FC<SelectContainerProps> = ({
  disabled = false,
}) => {
  const inputValue = useTagSelectorContext(c => c.inputValue);
  const editingIndex = useTagSelectorContext(c => c.editingIndex);
  const options = useTagSelectorContext(c => c.options);
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
      Option: CustomOption,
      Input: props => {
        return <CustomInput {...props} ref={inputRef} />;
      },
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
    inputValue.trim().length > 0 &&
    (editingIndex === null || // Always show for new tags
      options[editingIndex]?.value !== inputValue.trim()); // Only show when editing if value changed

  return (
    <CreatableSelect
      ref={selectRef}
      value={null}
      onChange={handleSelectChange}
      onCreateOption={handleCreateOption}
      onInputChange={handleInputChange}
      onBlur={handleBlur}
      inputValue={inputValue}
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
