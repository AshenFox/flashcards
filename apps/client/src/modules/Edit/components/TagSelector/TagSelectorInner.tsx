import React, { useRef } from "react";
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

  // Handle tag click and focus select
  const handleTagClickWithFocus = (index: number) => {
    handleTagClick(index);
    // Focus the select after state update
    setTimeout(() => {
      if (selectRef.current) {
        selectRef.current.focus();
      }
    }, 0);
  };

  // Dynamic placeholder based on editing state
  const dynamicPlaceholder =
    editingIndex !== null ? "Edit tag..." : placeholder;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Tags</h3>
      </div>

      <TagsContainer
        tags={tagOptions}
        editingIndex={editingIndex}
        disabled={disabled}
        onTagClick={handleTagClickWithFocus}
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
