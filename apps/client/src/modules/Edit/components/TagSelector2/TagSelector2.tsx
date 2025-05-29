import React from "react";

import { TagSelector2Provider } from "./TagSelector2Context";
import TagSelector2Inner from "./TagSelector2Inner";
import { TagSelector2Props } from "./types";

const TagSelector2: React.FC<TagSelector2Props> = ({
  tags = [],
  availableOptions = [],
  onChange,
  placeholder = "Add a tag...",
  disabled = false,
}) => {
  return (
    <TagSelector2Provider
      tags={tags}
      availableOptions={availableOptions}
      onChange={onChange}
    >
      <TagSelector2Inner placeholder={placeholder} disabled={disabled} />
    </TagSelector2Provider>
  );
};

export default TagSelector2;
