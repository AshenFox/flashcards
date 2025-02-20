import { FilterValue } from "@store/reducers/main/types";
import { Options } from "react-select";

export type SetFilterValue = (
  filter: string,
  value?: string | number | boolean,
) => void;

export type Option = { label: string; value: FilterValue };

export type FilterData = {
  id: string;
  label: string;
  defaultValue: FilterValue;
  options?: Options<Option>;
};
