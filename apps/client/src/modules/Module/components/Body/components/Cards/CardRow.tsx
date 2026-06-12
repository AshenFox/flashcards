import { Card, EditCard, useCardsUIStore } from "@components/Cards";
import type { CardDto } from "@flashcards/common";
import { memo } from "react";

import { useModuleFiltersStore } from "../../../../hooks";

type CardRowProps = {
  data: CardDto;
  loading: boolean;
};

const CardRow = ({ data, loading }: CardRowProps) => {
  const search = useModuleFiltersStore(s => s.filters.search);
  const by = useModuleFiltersStore(s => s.filters.by);
  const isEdit = useCardsUIStore(s => s.get(data._id).edit);

  if (isEdit) {
    return <EditCard data={data} toggle={true} loading={loading} />;
  }

  return <Card data={data} filter={search} filterType={by} />;
};

export default memo(CardRow);
