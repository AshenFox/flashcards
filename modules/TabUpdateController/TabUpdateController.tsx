import React, { memo, useEffect } from "react";

const TabUpdateController = () => {
  useEffect(() => {
    const reload = (e: StorageEvent) => window.location.reload();

    window.addEventListener("storage", reload);

    return () => window.removeEventListener("storage", reload);
  }, []);

  return <></>;
};

export default memo(TabUpdateController);
