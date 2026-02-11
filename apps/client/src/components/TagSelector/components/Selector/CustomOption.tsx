import { memo } from "react";
import { components, GroupBase, OptionProps } from "react-select";

import { useTagSelectorContext } from "../../TagSelectorContext";
import { TagOption } from "../../types";
import { TagLabel } from "../Tags";
import styles from "./styles.module.scss";

const CustomOption: React.ComponentType<
  OptionProps<TagOption, false, GroupBase<TagOption>>
> = props => {
  const { data } = props;

  const editingIndex = useTagSelectorContext(c => c.editingIndex);

  return (
    <components.Option {...props}>
      <TagLabel label={data.label} active={props.isFocused}>
        {data?.__isNew__ && (
          <span className={styles.create}>
            {editingIndex !== null ? "Update to" : "Create"}:
          </span>
        )}
      </TagLabel>
    </components.Option>
  );
};

export default memo(CustomOption);
