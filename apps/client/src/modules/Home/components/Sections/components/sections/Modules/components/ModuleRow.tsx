import type { ModuleDto } from "@flashcards/common";
import { Fragment, memo } from "react";

import Divider from "../../components/Divider";
import Module from "./Module";

export type ModuleRowProps = {
  data: ModuleDto;
  topDividerLabel?: string;
  belowDividerLabel?: string;
  search: string;
};

const ModuleRow = ({
  data,
  topDividerLabel,
  belowDividerLabel,
  search,
}: ModuleRowProps) => {
  return (
    <Fragment>
      <Divider label={topDividerLabel} top />
      <Module data={data} filter={search} />
      <Divider label={belowDividerLabel} />
    </Fragment>
  );
};

export default memo(ModuleRow);
