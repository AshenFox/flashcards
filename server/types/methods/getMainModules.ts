import { Module } from "types/entities";

export type ModulesGetQuery = {
  page?: number;
  search?: string;
  created?: "newest" | "oldest";
  draft?: boolean;
  sr?: boolean;
};

export type ModulesGetResponse = {
  draft: Module | null;
  entries: Module[];
  number: number;
  all: number;
  end: boolean;
};
