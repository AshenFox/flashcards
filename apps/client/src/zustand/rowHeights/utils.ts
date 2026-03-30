import { RowHeightsStoreApi } from "./types";

export const createDebouncedRowHeightsMerge = (storeApi: RowHeightsStoreApi, delayMs: number) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let pendingNs: string | undefined;
    const pendingUpdates: Record<string, number> = {};

    const runMerge = () => {
        if (pendingNs === undefined || Object.keys(pendingUpdates).length === 0) return;
        const key = pendingNs;
        const copy = { ...pendingUpdates };
        pendingNs = undefined;
        Object.keys(pendingUpdates).forEach(k => {
            delete pendingUpdates[k];
        });
        storeApi.getState().mergeRowHeights(key, copy);
    };

    const flush = () => {
        if (timer !== undefined) {
            clearTimeout(timer);
            timer = undefined;
        }
        runMerge();
    };

    const schedule = (namespaceKey: string, updates: Record<string, number>) => {
        pendingNs = namespaceKey;
        for (const [id, h] of Object.entries(updates)) pendingUpdates[id] = h;
        if (timer !== undefined) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = undefined;
            runMerge();
        }, delayMs);
    };

    return { schedule, flush };
};