import type { PaginationDto } from "@flashcards/common";
import { useHomeCardsFiltersStore } from "@modules/Home/components/Sections/components/sections/Cards/hooks/stores";
import { useHomeModulesFiltersStore } from "@modules/Home/components/Sections/components/sections/Modules/hooks";
import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";

import s from "./styles.module.scss";

const renderCount = (pagination: PaginationDto | null | undefined) => {
  if (!pagination) return null;
  const { all, number } = pagination;
  if (typeof all !== "number" || typeof number !== "number") return null;

  if (number !== all) {
    return `All: ${all} | Found: ${number}`;
  }

  return `All: ${all}`;
};

const ItemsNumber = () => {
  const router = useRouter();
  const { section } = router.query;

  const homeModulesPagination = useHomeModulesFiltersStore(s => s.pagination);
  const homeCardsPagination = useHomeCardsFiltersStore(s => s.pagination);

  const [modulesPagination, setModulesPagination] = useState<PaginationDto>(
    homeModulesPagination,
  );
  const [cardsPagination, setCardsPagination] =
    useState<PaginationDto>(homeCardsPagination);

  useEffect(() => {
    if (typeof homeModulesPagination?.all === "number") {
      setModulesPagination(homeModulesPagination);
    }
  }, [homeModulesPagination]);

  useEffect(() => {
    if (typeof homeCardsPagination?.all === "number") {
      setCardsPagination(homeCardsPagination);
    }
  }, [homeCardsPagination]);

  return (
    <div className={s.number}>
      {section === "cards" && renderCount(cardsPagination)}
      {section === "modules" && renderCount(modulesPagination)}
    </div>
  );
};

export default memo(ItemsNumber);
