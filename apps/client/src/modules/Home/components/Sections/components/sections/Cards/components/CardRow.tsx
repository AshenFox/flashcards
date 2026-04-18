import { Card, EditCard, useCardsUIStore } from "@components/Cards";
import type { CardDto } from "@flashcards/common";
import { memo } from "react";

export type CardRowProps = {
  data: CardDto;
  search: string;
  by: string;
  isModuleLink: boolean;
  loading: boolean;
};

const CardRow = ({
  data,
  search,
  by,
  isModuleLink,
  loading,
}: CardRowProps) => {
  const { _id } = data || {};

  const edit = useCardsUIStore(s => s.get(_id).edit);

  return edit ? (
    <EditCard data={data} toggle={true} loading={loading} />
  ) : (
    <Card
      data={data}
      filter={search}
      filterType={by}
      isModuleLink={isModuleLink}
    />
  );
};
export default memo(CardRow);
