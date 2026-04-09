import { FilterData } from "@components/Filters";
import { defaultCardsFilters } from "@zustand/filters";

/** When the first visible virtual row is at or above this index, load the previous page. */
export const FETCH_PREV_VISIBLE_THRESHOLD = 5;

export const filtersData: FilterData[] = [
  {
    id: "created",
    label: "Date Order",
    defaultValue: defaultCardsFilters.created,
    options: [
      { value: "newest", label: "Newest" },
      { value: "oldest", label: "Oldest" },
    ],
  },
  {
    id: "sr",
    label: "SR",
    defaultValue: defaultCardsFilters.sr,
    options: [
      { value: "all", label: "All" },
      { value: "in-lowest", label: "In Lowest" },
      { value: "in-highest", label: "In Highest" },
      { value: "out", label: "Out" },
    ],
  },
  {
    id: "by",
    label: "By",
    defaultValue: defaultCardsFilters.by,
    options: [
      { value: "term", label: "Term" },
      { value: "definition", label: "Definition" },
    ],
  },
];
