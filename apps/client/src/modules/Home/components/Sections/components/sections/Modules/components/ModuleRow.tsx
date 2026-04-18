import type { ModuleDto } from "@flashcards/common";
import { Fragment, memo } from "react";

import Divider from "../../components/Divider";
import Module from "./Module";

export type ModuleRowProps = {
  data: ModuleDto;
  prevDateString: string | undefined;
  search: string;
};

const ModuleRow = ({ data, prevDateString, search }: ModuleRowProps) => {
  const { creation_date } = data || {};

  return (
    <Fragment>
      {/* <Divider prevDateString={prevDateString} curDateString={creation_date} /> */}
      <Module data={data} filter={search} />
    </Fragment>
  );
};

export default memo(ModuleRow);
