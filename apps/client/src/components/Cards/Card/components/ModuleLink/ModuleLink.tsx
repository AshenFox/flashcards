import { ExternalLinkIcon } from "@ui/Icons";
import { Tooltip } from "@ui/Tooltip";
import clsx from "clsx";
import Link from "next/link";
import React, { memo } from "react";

import s from "./styles.module.scss";

type ModuleLinkProps = {
  moduleId: string;
};

const ModuleLink = ({ moduleId }: ModuleLinkProps) => {
  return (
    <Link href={`/module/${moduleId}`}>
      <Tooltip content="To the card's module">
        <div className={clsx(s.module_link)}>
          <ExternalLinkIcon />
        </div>
      </Tooltip>
    </Link>
  );
};

export default memo(ModuleLink);
