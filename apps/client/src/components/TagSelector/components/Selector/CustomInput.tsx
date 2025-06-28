import { forwardRef, memo, useCallback } from "react";
import { components } from "react-select";

const useMergedRef = <T,>(
  ...refs: (((instance: T | null) => void) | React.MutableRefObject<T>)[]
): ((instance: T | null) => void) => {
  return useCallback(
    node =>
      refs.forEach(ref => {
        if (typeof ref === "function") ref(node);
        else ref.current = node;
      }),
    [refs],
  );
};

const CustomInput = forwardRef<HTMLInputElement, any>((props, ref) => {
  const mergedRef = useMergedRef<HTMLInputElement>(ref, props.innerRef);
  return (
    <components.Input {...props} enterKeyHint="enter" innerRef={mergedRef} />
  );
});

CustomInput.displayName = "CustomInput";

export default memo(CustomInput);
