import Gallery from "@components/Gallery";
import { usePlug } from "@helpers/hooks/usePlug";
import { useActions } from "@store/hooks";
import { Card } from "@store/reducers/main/mainInitState";
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
  data: Card;
  loading?: boolean;
  draft?: boolean;
  index?: number;
  toggle?: boolean;
  game?: boolean;
  number?: number;
};

const EditCard = ({
  data,
  loading = false,
  draft,
  index,
  toggle,
  game,
  number,
}: EditCardProps) => {
  const { control_card, edit_card } = useActions();

  const { _id, term, defenition, gallery } = data || {};

  const { search } = gallery || {};

  const handleCardChange = useCallback(
    (type: "term" | "defenition") => (e: ContentEditableEvent) => {
      control_card(_id, type, e.target.value);
      clearTimeout(timer.current);
      timer.current = setTimeout(async () => {
        edit_card(_id);
        timer.current = null;
      }, 500);
    },
    [_id, control_card, edit_card],
  );

  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const deleteActive = number > 2;

  const [visible, ref, Plug] = usePlug(s.card);

  if (!visible) return Plug;

  return (
    <div ref={ref} className={clsx(s.card, game && s.game)}>
      <div className={s.header}>
        <div className={s.number}>{index && index}</div>
        {draft && <Save data={data} />}
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
              html={defenition}
              disabled={loading}
              onChange={handleCardChange("defenition")}
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
