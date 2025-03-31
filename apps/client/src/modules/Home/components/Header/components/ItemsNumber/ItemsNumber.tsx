import { PaginationDto } from "@flashcards/common";
import { useAppSelector } from "@store/store";
import { useRouter } from "next/router";
import React, { memo, useCallback, useEffect, useState } from "react";

import s from "./styles.module.scss";

const ItemsNumber = () => {
  const router = useRouter();
  const { section } = router.query;

  const homeModulesPagination = useAppSelector(
    s => s.main.sections.homeModules.pagination,
  );
  const homeCardsPagination = useAppSelector(
    s => s.main.sections.homeCards.pagination,
  );

  const [modulesPagination, setModulesPagination] = useState<PaginationDto>(
    homeModulesPagination,
  );
  const [cardsPagination, setCardsPagination] =
    useState<PaginationDto>(homeCardsPagination);

  useEffect(() => {
    if (typeof homeModulesPagination.all === "number") {
      setModulesPagination(homeModulesPagination);
    }
  }, [homeModulesPagination]);

  useEffect(() => {
    if (typeof homeCardsPagination.all === "number") {
      setCardsPagination(homeCardsPagination);
    }
  }, [homeCardsPagination]);

  const renderCount = useCallback((pagination: PaginationDto) => {
    if (typeof pagination.all !== "number") return null;

    if (pagination.number !== pagination.all) {
      return `All: ${pagination.all} | Found: ${pagination.number}`;
    }

    return `All: ${pagination.all}`;
  }, []);

  if (section === "sr") {
    return null;
  }

  return (
    <div className={s.number}>
      {section === "cards" && renderCount(cardsPagination)}
      {section === "modules" && renderCount(modulesPagination)}
    </div>
  );
};

export default memo(ItemsNumber);
