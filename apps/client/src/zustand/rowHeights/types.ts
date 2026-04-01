export type RowHeightsStoreApi = {
    getState: () => Pick<RowHeightsStore, "mergeRowHeights">;
};

export type RowHeightsStore = {
    namespaces: Record<string, Record<string, number>>;
    mergeRowHeights: (namespaceKey: string, updates: Record<string, number>) => void;
};