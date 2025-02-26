export type PagedDataCreator<Entry = unknown> = {
  entries: Entry[];
  pagination: {
    number: number;
    page: number;
    all: number;
    end: boolean;
  };
};
