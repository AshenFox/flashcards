import type { ModuleDto } from "@flashcards/common";

import {
  getBelowDividerLabel,
  getTopDividerLabel,
} from "../../components/Divider/Divider";

export type HomeModulesVirtualItem =
  | { type: "module"; _id: string; module: ModuleDto }
  | { type: "top-divider"; _id: "top"; label: string }
  | { type: "below-divider"; _id: string; label: string };

export const TOP_DIVIDER_ID = "top";
export const belowDividerId = (moduleId: string) => `below:${moduleId}`;

export function buildHomeModulesItems(
  rawModules: ModuleDto[],
  hasPreviousPage: boolean,
): HomeModulesVirtualItem[] {
  const out: HomeModulesVirtualItem[] = [];

  if (!hasPreviousPage && rawModules.length > 0) {
    const label = getTopDividerLabel(rawModules[0].creation_date);
    if (label) {
      out.push({ type: "top-divider", _id: TOP_DIVIDER_ID, label });
    }
  }

  for (let i = 0; i < rawModules.length; i++) {
    const moduleItem = rawModules[i];
    out.push({ type: "module", _id: moduleItem._id, module: moduleItem });

    const nextDate = rawModules[i + 1]?.creation_date;
    const label = getBelowDividerLabel(moduleItem.creation_date, nextDate);
    if (label) {
      out.push({
        type: "below-divider",
        _id: belowDividerId(moduleItem._id),
        label,
      });
    }
  }

  return out;
}
