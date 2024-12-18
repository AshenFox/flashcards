export type PageableCreator<Entry = unknown> = {
  entries: Entry[];
  number: number;
  page: number;
  all: number;
  end: boolean;
};
