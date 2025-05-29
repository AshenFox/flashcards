import React from "react";
import CreatableSelect from "react-select/creatable";

import { customStyles } from "./customStyles";
import styles from "./styles.module.scss";
import TagsContainer from "./TagsContainer";
import { useTagSelector2Context } from "./TagSelector2Context";

interface TagSelector2InnerProps {
  placeholder?: string;
  disabled?: boolean;
}

const TagSelector2Inner: React.FC<TagSelector2InnerProps> = ({
  placeholder = "Add a tag...",
  disabled = false,
}) => {
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
    formatCreateLabel,
  } = useTagSelector2Context();

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
          value={null}
          onChange={handleSelectChange}
          onCreateOption={handleCreateOption}
          onInputChange={handleInputChange}
          inputValue={inputValue}
          options={selectOptions}
          placeholder={placeholder}
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

export default TagSelector2Inner;
