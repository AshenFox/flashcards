import { editUpdateCard, editDeleteCard } from "@api/methods";
import { srDropCards } from "@api/methods";
import { srSetControl } from "@api/methods";
import { scrapeGetDictionary } from "@api/methods";
import { useMutation } from "@tanstack/react-query";
import sanitize from "sanitize-html";

import { saveLastUpdate } from "@store/helper-functions";

import { useCardsQueryKey } from "./context";

import { queryClient } from "@api/queryClient";
import { MainCardsCache } from "./types";
import { withProduce } from "@zustand/helpers";
import { formatDictionaryResult } from "./helpers";

// ---------------------------------------------------------------------------
// Mutation hooks
// ---------------------------------------------------------------------------

export const useEditCardMutation = () => {
  return useMutation({
    mutationFn: (card: Record<string, unknown>) => editUpdateCard(card),
    onSuccess: () => saveLastUpdate(),
  });
};

export const useDeleteCardMutation = () => {
  const queryKey = useCardsQueryKey();

  return useMutation({
    mutationFn: (_id: string) => editDeleteCard(_id),
    onSuccess: () => {
      saveLastUpdate();
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useDropCardSRMutation = () => {
  const queryKey = useCardsQueryKey();

  return useMutation({
    mutationFn: (_id: string) => srDropCards([_id]),
    onSuccess: (data, _id) => {
      saveLastUpdate();
      queryClient.setQueryData(
        queryKey,
        withProduce<MainCardsCache>((draft) => {
          for (const page of draft.pages) {
            const entry = page.entries.find((c) => c._id === _id);
            if (entry) {
              entry.stage = data.stage;
              entry.nextRep = data.nextRep;
              entry.prevStage = data.prevStage;
              entry.lastRep = data.lastRep;
              break;
            }
          }
        }),
      );
    },
  });
};

export const useSetCardSRMutation = () => {
  const queryKey = useCardsQueryKey();

  return useMutation({
    mutationFn: ({ _id_arr, value }: { _id_arr: string[]; value: boolean }) =>
      srSetControl(_id_arr, value),
    onSuccess: (_, { _id_arr, value }) => {
      saveLastUpdate();
      const idSet = new Set(_id_arr);
      queryClient.setQueryData(
        queryKey,
        withProduce<MainCardsCache>((draft) => {
          for (const page of draft.pages) {
            for (const entry of page.entries) {
              if (idSet.has(entry._id)) entry.studyRegime = value;
            }
          }
        }),
      );
    },
  });
};

export const useScrapeDictionaryMutation = (_id: string) => {
  return useMutation({
    mutationKey: ["scrape", _id],
    mutationFn: async ({ term, value }: { term: string; value: "cod" | "urban" }) => {
      if (!term) throw new Error("Term field can not be empty.");
      const termClean = term.replace(/<[^>]*>/g, "");
      const query = value === "cod" ? termClean.replace(/\s+/g, "-") : termClean.replace(/\s+/g, "+");

      if (value === "cod") {
        const data = await scrapeGetDictionary("cod", query);
        return sanitize(formatDictionaryResult({ type: "cod", data }));
      } else if (value === "urban") {
        const data = await scrapeGetDictionary("urban", query);
        return sanitize(formatDictionaryResult({ type: "urban", data }));
      }

      return '';
    },
    onSuccess: () => saveLastUpdate(),
  });
};
