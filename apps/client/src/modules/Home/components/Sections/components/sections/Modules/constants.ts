import { FilterData } from "@components/Filters";
import { defaultModulesFilters } from "@zustand/filters";

/** When the first visible virtual row is at or above this index, load the previous page. */
export const FETCH_PREV_VISIBLE_THRESHOLD = 5;

export const filtersData: FilterData[] = [
  {
    id: "created",
    label: "Date Order",
    defaultValue: defaultModulesFilters.created,
    options: [
      { value: "newest", label: "Newest" },
      { value: "oldest", label: "Oldest" },
    ],
  },
  {
    id: "sr",
    label: "SR",
    defaultValue: defaultModulesFilters.sr,
    options: [
      { value: undefined, label: "All" },
      { value: true, label: "In" },
      { value: false, label: "Out" },
    ],
  },
  {
    id: "draft",
    label: "Draft",
    defaultValue: defaultModulesFilters.draft,
    options: [
      { value: true, label: "Show" },
      { value: false, label: "Hide" },
    ],
  },
];

