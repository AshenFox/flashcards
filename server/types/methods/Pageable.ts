export type Pageable<T> = {
  entries: T[];
  number: number;
  page: number;
  all: number;
  end: boolean;
};
