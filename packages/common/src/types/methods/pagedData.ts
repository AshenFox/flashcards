export type PaginationCreator = {
  number: number;
  page: number;
  all: number;
  end: boolean;
};

export type PagedDataCreator<
  Entry extends unknown,
  Pagination extends PaginationCreator,
> = {
  entries: Entry[];
  pagination: Pagination;
};

// server types
export type Pagination = PaginationCreator;

// api types
export type PaginationDto = PaginationCreator;
