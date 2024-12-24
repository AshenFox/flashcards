import { PageableCreator } from "./Pageable";

export type CardsGetQueryCreator = {
  page?: number;
  search?: string;
  created?: "newest" | "oldest";
  by?: "term" | "definition";
  sr?: boolean;
};

export type CardsGetResponseCreator<Pageable = PageableCreator> = Pageable;
