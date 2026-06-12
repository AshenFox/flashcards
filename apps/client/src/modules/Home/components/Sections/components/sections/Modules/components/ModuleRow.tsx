import type { ModuleDto } from "@flashcards/common";
import { memo } from "react";

import Module from "./Module";

export type ModuleRowProps = {
  data: ModuleDto;
  search: string;
};

const ModuleRow = ({ data, search }: ModuleRowProps) => {
  return <Module data={data} filter={search} />;
};

export default memo(ModuleRow);
