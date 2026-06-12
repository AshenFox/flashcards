import { ExternalLinkIcon } from "@ui/Icons";
import Tooltip from "@ui/Tooltip";
import clsx from "clsx";
import Link from "next/link";
import React, { memo } from "react";

import s from "./styles.module.scss";

type ModuleLinkProps = {
  moduleId: string;
};

const ModuleLink = ({ moduleId }: ModuleLinkProps) => {
  const id = `module-link-${moduleId}`;

  return (
    <Link href={`/module/${moduleId}`}>
      <div className={clsx(s.module_link)} data-tooltip-id={id}>
        <ExternalLinkIcon />
        <Tooltip id={id}>To the card&apos;s module</Tooltip>
      </div>
    </Link>
  );
};

export default memo(ModuleLink);
