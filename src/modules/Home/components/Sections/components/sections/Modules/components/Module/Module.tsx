import { usePlug } from "@helpers/hooks/usePlug";
import { Module as ModuleType } from "@store/reducers/main/mainInitState";
import DateStr from "@ui/DateStr";
import { StudyRegimeIcon } from "@ui/Icons";
import TextArea from "@ui/TextArea";
import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";

import s from "./styles.module.scss";

type ModuleProps = {
  data: ModuleType;
  filter?: string;
};

const Module = ({ data, filter = null }: ModuleProps) => {
  const { title, author, number, numberSR, draft, _id, creation_date } =
    data ?? {};

  const filterRegExp = new RegExp(
    `${filter}(?!br>|r>|>|\/div>|div>|iv>|v>|nbsp;|bsp;|sp;|p;|;|\/span>|span>|pan>|an>|n>)`,
    "g",
  );

  const replacement = `<span class='${s.highlighted_text}'>${filter}</span>`;

  let formatted_title: string;

  if (filter) formatted_title = title.replace(filterRegExp, replacement);

  let html: string;

  if (filter) html = formatted_title;
  if (!draft && !filter) html = title;
  if (!title) html = "(Untitled)";
  if (draft) html = "(Draft)";

  const [visible, ref, Plug] = usePlug(s.module);

  return (
    <Link href={draft ? `/edit/draft` : `/module/${_id}`}>
      {visible ? (
        <div className={s.module} ref={ref}>
          <div className={s.header}>
            <div className={s.created}>
              <span>
                Created <DateStr date={creation_date} />
              </span>
            </div>
          </div>
          <div className={s.main}>
            <div className={s.info}>
              <div className={s.term_number}>{number} Terms</div>
              {!!numberSR && (
                <div className={s.sr}>
                  <StudyRegimeIcon />
                  {numberSR}
                </div>
              )}
              {!draft && <div className={s.author}>{author}</div>}
            </div>
            <TextArea
              html={html}
              className={clsx(s.title, (draft || !title) && s.highlighted)}
            />
          </div>
        </div>
      ) : (
        Plug
      )}
    </Link>
  );
};

export default memo(Module);
