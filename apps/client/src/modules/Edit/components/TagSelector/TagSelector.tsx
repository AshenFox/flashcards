import React, { memo } from "react";

import TagSelectorProvider from "./TagSelectorContext";
import TagSelectorInner from "./TagSelectorInner";
import { TagSelectorProps } from "./types";

const TagSelector: React.FC<TagSelectorProps> = ({
  tags = [],
  availableOptions = [],
  onChange,
  disabled = false,
}) => {
  return (
    <TagSelectorProvider
      tags={tags}
      availableOptions={availableOptions}
      onChange={onChange}
    >
      <TagSelectorInner disabled={disabled} />
    </TagSelectorProvider>
  );
};

export default memo(TagSelector);
