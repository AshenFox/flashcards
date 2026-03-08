import Gallery from "@components/Gallery";
import type { CardDto } from "@flashcards/common";
import { usePlug } from "@helpers/hooks/usePlug";
import { useCardsUIStore, useControlCard, useEditCard } from "@zustand/cards";
import TextArea from "@ui/TextArea";
import TextLabel from "@ui/TextLabel";
import clsx from "clsx";
import { memo, useCallback, useRef } from "react";
import { ContentEditableEvent } from "react-contenteditable";

import AddImg from "./components/AddImg";
import Close from "./components/Close";
import Delete from "./components/Delete";
import Save from "./components/Save";
import Scrape from "./components/Scrape";
import s from "./styles.module.scss";

type EditCardProps = {
  data: CardDto;
  loading?: boolean;
  selectionActive?: boolean;
  index?: number;
  toggle?: boolean;
  game?: boolean;
  number?: number;
};

const EditCard = ({
  data,
  loading = false,
  selectionActive = false,
  index,
  toggle,
  game,
  number,
}: EditCardProps) => {
  const controlCard = useControlCard();
  const editCard = useEditCard();

  const { _id, term, definition } = data || {};

  const search = useCardsUIStore(s => s.get(_id).gallery.search);

  const handleCardChange = useCallback(
    (type: "term" | "definition") => (e: ContentEditableEvent) => {
      controlCard({ _id, type, value: e.target.value });
      clearTimeout(timer.current);
      timer.current = setTimeout(async () => {
        editCard(_id);
        timer.current = null;
      }, 500);
    },
    [_id, controlCard, editCard],
  );

  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const deleteActive = number > 2;

  const [visible, ref, Plug] = usePlug(s.card);

  if (!visible) return Plug;

  return (
    <div ref={ref} className={clsx(s.card, game && s.game)}>
      <div className={s.header}>
        <div className={s.number}>{!!index && index}</div>
        {selectionActive && <Save data={data} />}
        {toggle ? (
          <Close data={data} />
        ) : (
          <Delete data={data} active={deleteActive} />
        )}
      </div>

      <div className={s.items}>
        <div className={s.term}>
          <TextArea
            html={term}
            disabled={loading}
            onChange={handleCardChange("term")}
            id={`term${data._id}`}
            isStyled
          />
          <TextLabel htmlFor={`term${data._id}`}>TERM</TextLabel>
        </div>

        <div className={s.definition}>
          <div className={s.definition_input}>
            <TextArea
              html={definition}
              disabled={loading}
              onChange={handleCardChange("definition")}
              id={`definition${data._id}`}
              isStyled
            />
            <TextLabel htmlFor={`definition${data._id}`}>DEFINITION</TextLabel>
          </div>
          <AddImg data={data} />
        </div>
      </div>
      <Scrape data={data} />
      <Gallery data={data} active={search} game={game} />
    </div>
  );
};

export default memo(EditCard);
