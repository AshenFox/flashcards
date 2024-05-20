import {
  getIsDraft,
  getIsFlashcards,
  getIsWrite,
} from "@helpers/functions/determinePath";
import { useActions, useAppSelector } from "@store/hooks";
import { NewModuleIcon, ShuffleIcon } from "@ui/Icons";
import clsx from "clsx";
import { useRouter } from "next/router";
import {
  CSSProperties,
  memo,
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
} from "react";

import Divider from "./components/Divider";
import Item from "./components/Item";
import s from "./styles.module.scss";

const Dropdown = () => {
  const {
    log_out,
    set_flashcards_shuffled,
    sort_flashcards,
    shuffle_flashcards,
    reset_flashcards_progress,
    prepare_write,
    set_dropdown,
  } = useActions();

  const shuffled = useAppSelector(s => s.game.flashcards.shuffled);
  const dropdown_active = useAppSelector(s => s.header.dropdown_active);
  const header_height = useAppSelector(s => s.dimen.header_height);

  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === "sr";

  const isFlashcards = getIsFlashcards(router.pathname);
  const isWrite = getIsWrite(router.pathname);
  const isDraft = getIsDraft(router.asPath);

  const deactivateDropdown = useRef((e: MouseEvent) => {
    const menuEl = (e.target as HTMLElement).closest(".header__menu");
    const menuItemEl = (e.target as HTMLElement).closest(".header__menu-item");

    if (menuEl) {
      if (menuItemEl) set_dropdown(false);
    } else {
      set_dropdown(false);
    }
  });

  useEffect(() => {
    setTimeout(
      () =>
        dropdown_active
          ? window.addEventListener("click", deactivateDropdown.current)
          : window.removeEventListener("click", deactivateDropdown.current),
      0,
    );
    return () =>
      window.removeEventListener("click", deactivateDropdown.current);
  }, [dropdown_active]);

  const clickSuffle = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (shuffled) {
      sort_flashcards();
      set_flashcards_shuffled(false);
    } else {
      shuffle_flashcards();
      set_flashcards_shuffled(true);
    }

    reset_flashcards_progress();
  };

  const clickStartOver = (e: ReactMouseEvent<HTMLButtonElement>) =>
    prepare_write();

  const logOut = (e: ReactMouseEvent<HTMLButtonElement>) => log_out();

  const stylesHeader: CSSProperties = { paddingTop: `${header_height - 1}px` };

  const className = clsx(
    s.dropdown,
    dropdown_active && s.active,
    isFlashcards || isWrite ? s.hide_min_tablet : s.hide_min_mobile,
  );

  return (
    <div className={className} style={stylesHeader}>
      {!isDraft && (
        <Item href="/edit/draft" icon={<NewModuleIcon />}>
          Create new module
        </Item>
      )}
      <Item onClick={logOut}>Log out</Item>

      {(isFlashcards || isWrite) && !isSR && <Divider>Options:</Divider>}

      {isFlashcards && !isSR && (
        <Item onClick={clickSuffle} icon={<ShuffleIcon />} active={shuffled}>
          Shuffle
        </Item>
      )}
      {isWrite && !isSR && (
        <Item onClick={clickStartOver} caution>
          Start over
        </Item>
      )}
    </div>
  );
};

export default memo(Dropdown);
