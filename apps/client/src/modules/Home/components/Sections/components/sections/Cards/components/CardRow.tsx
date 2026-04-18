import { Card, EditCard, useCardsUIStore } from "@components/Cards";
import type { CardDto } from "@flashcards/common";
import { Fragment, memo } from "react";

import Divider from "../../components/Divider";

export type CardRowProps = {
  data: CardDto;
  prevDateString: string | undefined;
  search: string;
  by: string;
  isModuleLink: boolean;
  loading: boolean;
};

const CardRow = ({
  data,
  prevDateString,
  search,
  by,
  isModuleLink,
  loading,
}: CardRowProps) => {
  const { _id, creation_date } = data || {};

  const edit = useCardsUIStore(s => s.get(_id).edit);

  return (
    <Fragment>
      {/* <Divider prevDateString={prevDateString} curDateString={creation_date} /> */}
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
    </Fragment>
  );
};
export default memo(CardRow);
