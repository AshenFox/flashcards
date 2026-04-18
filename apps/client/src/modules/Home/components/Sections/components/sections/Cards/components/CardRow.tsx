import { Card, EditCard, useCardsUIStore } from "@components/Cards";
import type { CardDto } from "@flashcards/common";
import { Fragment, memo } from "react";

import Divider from "../../components/Divider";

export type CardRowProps = {
  data: CardDto;
  topDividerLabel?: string;
  belowDividerLabel?: string;
  search: string;
  by: string;
  isModuleLink: boolean;
  loading: boolean;
};

const CardRow = ({
  data,
  topDividerLabel,
  belowDividerLabel,
  search,
  by,
  isModuleLink,
  loading,
}: CardRowProps) => {
  const { _id } = data || {};

  const edit = useCardsUIStore(s => s.get(_id).edit);

  return (
    <Fragment>
      <Divider label={topDividerLabel} top />
      {edit ? (
        <EditCard data={data} toggle={true} loading={loading} />
      ) : (
        <Card
          data={data}
          filter={search}
          filterType={by}
          isModuleLink={isModuleLink}
        />
      )}
      <Divider label={belowDividerLabel} />
    </Fragment>
  );
};
export default memo(CardRow);
