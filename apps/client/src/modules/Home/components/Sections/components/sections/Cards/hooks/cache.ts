import { queryClient } from "@api/queryClient";
import { CardsCache, CardsCacheHook } from "@components/Cards";
import type { CardDto, GetMainCardsResponseDto } from "@flashcards/common";
import { withProduce } from "@zustand/helpers";
import { useMemo } from "react";

import { getQueryKey } from "./query";
import { useHomeCardsFiltersStore } from "./stores";

export type MainCardsCache = { pages: GetMainCardsResponseDto[] };

const getEntries = (data: MainCardsCache | undefined): CardDto[] => {
    if (!data) return [];
    return data.pages.flatMap(page => page.entries);
};

export const useHomeCardsCache: CardsCacheHook = () => {
    const filters = useHomeCardsFiltersStore(state => state.filters);
    const queryKey = useMemo(() => getQueryKey(filters), [filters]);

    const cardsCache: CardsCache = useMemo(() => ({
        getCard: (_id: string) => {
            const data = queryClient.getQueryData<MainCardsCache>(queryKey);
            const entries = getEntries(data);
            return entries.find(card => card._id === _id);
        },
        getAllCards: () => {
            const data = queryClient.getQueryData<MainCardsCache>(queryKey);
            return getEntries(data);
        },
        set: (recipe: (entries: CardDto[]) => void) => {
            queryClient.setQueryData(
                queryKey,
                withProduce<MainCardsCache>(draft => {
                    recipe(draft.pages.flatMap(page => page.entries));
                }),
            );
        },
        invalidate: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    }), [queryKey]);


    return cardsCache;
};