export type RowHeightsStoreApi = {
    getState: () => Pick<RowHeightsStore, "mergeRowHeights">;
};

export type RowHeightsStore = {
    namespaces: Record<string, NamespaceBlob>;
    mergeRowHeights: (namespaceKey: string, updates: Record<string, number>) => void;
};

export type NamespaceBlob = {
    order: string[];
    heights: Record<string, number>;
};