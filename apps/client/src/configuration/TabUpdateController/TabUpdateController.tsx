import React, { memo, useCallback, useEffect, useRef } from "react";

const TabUpdateController = () => {
  const shouldReloadRef = useRef(false);

  const reload = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      const isFocused = document.hasFocus();
      if (isFocused) reload();
      else shouldReloadRef.current = true;
    };

    const handleFocus = () => {
      if (shouldReloadRef.current) {
        shouldReloadRef.current = false;
        reload();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return <></>;
};

export default memo(TabUpdateController);
