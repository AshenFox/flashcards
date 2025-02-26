import clsx from "clsx";
import React, { Children, cloneElement, memo, ReactElement } from "react";

import s from "../styles.module.scss";
import { InteractiveElementProps } from "../types";

type BlockProps = {
  children: ReactElement<InteractiveElementProps>[];
};

const Block = ({ children }: BlockProps) => (
  <div className={clsx(s.block, "interactive_element__block")}>
    {Children.map(children, child =>
      cloneElement(child, { design: "outline" }),
    )}
  </div>
);

export default memo(Block);
