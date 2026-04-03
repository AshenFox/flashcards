import { Card, EditCard, useCardsUIStore } from "@components/Cards";
import type { CardDto } from "@flashcards/common";
import Link from "next/link";
import { Fragment, memo } from "react";

import Divider from "../components/Divider";

function hash32(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function cardHeightFromCreationDate(creationDate: string): number {
  const MIN = 200;
  const MAX = 280;
  if (!creationDate) return MIN;
  return MIN + (hash32(creationDate) % (MAX - MIN + 1));
}

export type CardRowProps = {
  data: CardDto;
  prevDateString: string | undefined;
  search: string;
  by: string;
  isModuleLink: boolean;
  loading: boolean;
};

export const CardRow = memo(
  ({
    data,
    prevDateString,
    search,
    by,
    isModuleLink,
    loading,
  }: CardRowProps) => {
    const { _id, creation_date } = data || {};

    const height = cardHeightFromCreationDate(creation_date);

    const edit = useCardsUIStore(s => s.get(_id).edit);

    return (
      <div style={{ height: height, backgroundColor: "red" }}>
        data._id: {data._id}
        <br />
        height: {height}
        <br />
        <Link href={`/module/${data.moduleID}`}>Link</Link>
      </div>
    );

    return (
      <Fragment>
        {/* <Divider
          prevDateString={prevDateString}
          curDateString={creation_date}
        /> */}
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
  },
);

CardRow.displayName = "CardRow";
