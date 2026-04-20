import { useLayoutEffect, useRef } from "react";

import {
  type OwnerId,
  type PullOptions,
  registerOwner,
  unregisterOwner,
  updateOwner,
} from "./registry";

export const useAppVerticalPull = (options: PullOptions) => {
  const idRef = useRef<OwnerId | null>(null);

  useLayoutEffect(() => {
    const id = registerOwner(options);
    idRef.current = id;

    return () => {
      unregisterOwner(id);
      idRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (idRef.current != null) updateOwner(idRef.current, options);
  }, [options]);
};
