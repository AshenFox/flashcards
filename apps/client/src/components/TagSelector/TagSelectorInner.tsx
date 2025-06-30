import React, { memo, useEffect } from "react";

import Selector from "./components/Selector/Selector";
import { Tags } from "./components/Tags";
import { useTagSelectorContext } from "./TagSelectorContext";

const TagSelectorInner: React.FC = () => {
  const editingIndex = useTagSelectorContext(c => c.editingIndex);
  const selectRef = useTagSelectorContext(c => c.selectRef);

  // Focus the select when editing starts
  useEffect(() => {
    if (editingIndex !== null && selectRef.current) {
      selectRef.current.focus();
    }
  }, [editingIndex, selectRef]);

  return (
    <div>
      <Tags />
      <Selector />
    </div>
  );
};

export default memo(TagSelectorInner);
