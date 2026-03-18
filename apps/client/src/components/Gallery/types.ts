export type ImgurlFields = {
    ok: boolean;
};

export type ImgurlBase = {
    url: string;
    thumbnail?: string;
    snippet?: string;
    context?: string;
};

export type ImgurlObj = ImgurlFields & ImgurlBase;

export type ImgurlObjs = {
    [key: string]: ImgurlObj;
};
