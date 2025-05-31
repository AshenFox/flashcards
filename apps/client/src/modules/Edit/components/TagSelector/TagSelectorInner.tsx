import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  components as rsComponents,
  GroupBase,
  OptionProps,
} from "react-select";
import CreatableSelect from "react-select/creatable";
import { SelectComponents } from "react-select/dist/declarations/src/components";

import { customStyles } from "./customStyles";
import styles from "./styles.module.scss";
import TagsContainer from "./TagsContainer";
import { useTagSelectorContext } from "./TagSelectorContext";
import { TagOption } from "./types";

interface TagSelectorInnerProps {
  placeholder?: string;
  disabled?: boolean;
}

// Custom Option component for hierarchical display
const HierarchyOption: React.FC<OptionProps<TagOption>> = props => {
  const { data } = props;

  const renderOptionContent = (label: string) => {
    const parts = label.split("::");

    if (parts.length === 1) {
      return <span>{label}</span>;
    }

    return (
      <span className={styles.hierarchyContainer}>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <span
              className={`${styles.hierarchyPart} ${styles.optionPart} ${
                index === 0
                  ? styles.rootPart
                  : index === parts.length - 1
                    ? styles.leafPart
                    : styles.middlePart
              }`}
            >
              {part}
            </span>
            {index < parts.length - 1 && (
              <span
                className={`${styles.hierarchySeparator} ${styles.optionSeparator}`}
              >
                ›
              </span>
            )}
          </React.Fragment>
        ))}
      </span>
    );
  };

  return (
    <rsComponents.Option {...props}>
      {renderOptionContent(data.label)}
    </rsComponents.Option>
  );
};

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

  const components = useMemo<
    Partial<SelectComponents<TagOption, false, GroupBase<TagOption>>>
  >(() => {
    return {
      DropdownIndicator: () => null,
      IndicatorSeparator: () => null,
      Input: props => <rsComponents.Input {...props} enterKeyHint="enter" />,
      Option: HierarchyOption,
    };
  }, []);

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
    </div>
  );
};

export default TagSelectorInner;
