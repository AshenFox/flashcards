import React, { useEffect, useRef } from "react";
import CreatableSelect from "react-select/creatable";

import { customStyles } from "./customStyles";
import styles from "./styles.module.scss";
import TagsContainer from "./TagsContainer";
import { useTagSelectorContext } from "./TagSelectorContext";

interface TagSelectorInnerProps {
  placeholder?: string;
  disabled?: boolean;
}

const TagSelectorInner: React.FC<TagSelectorInnerProps> = ({
  placeholder = "Add a tag...",
  disabled = false,
}) => {
  const selectRef = useRef<any>(null);

  const {
    inputValue,
    editingIndex,
    tagOptions,
    selectOptions,
    handleDeleteTag,
    handleTagClick,
    handleSelectChange,
    handleCreateOption,
    handleInputChange,
    handleKeyDown,
    handleBlur,
    formatCreateLabel,
  } = useTagSelectorContext();

  // Focus the select when editing starts
  useEffect(() => {
    if (editingIndex !== null && selectRef.current) {
      selectRef.current.focus();
    }
  }, [editingIndex]);

  // Dynamic placeholder based on editing state
  const dynamicPlaceholder =
    editingIndex !== null ? "Edit tag..." : placeholder;

  // Only show menu when there's input text and when editing, only if the value has changed
  const shouldShowMenu =
    inputValue.trim().length > 0 &&
    (editingIndex === null || // Always show for new tags
      tagOptions[editingIndex]?.value !== inputValue.trim()); // Only show when editing if value changed

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Tags</h3>
      </div>

      <TagsContainer
        tags={tagOptions}
        editingIndex={editingIndex}
        disabled={disabled}
        onTagClick={handleTagClick}
        onDeleteTag={handleDeleteTag}
      />

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
          styles={customStyles}
          className={styles.select}
          classNamePrefix="tag-selector"
          onKeyDown={handleKeyDown}
          noOptionsMessage={() => "Type to create a new tag"}
          formatCreateLabel={formatCreateLabel}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
        />
      </div>
    </div>
  );
};

export default TagSelectorInner;
