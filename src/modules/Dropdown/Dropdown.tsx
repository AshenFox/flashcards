import {
  getIsDraft,
  getIsFlashcards,
  getIsSettings,
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
    shuffleFlashcards,
    sortFlashcards,
    setFlashcardsShuffled,
    logOut,
    resetFlashcardsProgress,
    prepareWrite,
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
  const isSettings = getIsSettings(router.pathname);

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
    const callback = deactivateDropdown.current;

    setTimeout(
      () =>
        dropdown_active
          ? window.addEventListener("click", callback)
          : window.removeEventListener("click", callback),
      0,
    );
    return () => window.removeEventListener("click", callback);
  }, [dropdown_active]);

  const clickShuffle = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (shuffled) {
      sortFlashcards();
      setFlashcardsShuffled({ value: false });
    } else {
      shuffleFlashcards();
      setFlashcardsShuffled({ value: true });
    }

    resetFlashcardsProgress();
  };

  const clickStartOver = (e: ReactMouseEvent<HTMLButtonElement>) =>
    prepareWrite();

  const onLogOutClick = (e: ReactMouseEvent<HTMLButtonElement>) => logOut();

  const stylesHeader: CSSProperties = {
    paddingTop: `${header_height - 1}px`,
  };

  const className = clsx(
    s.dropdown,
    dropdown_active && s.active,
    (isFlashcards || isWrite) && s.isGame,
  );

  return (
    <div className={className} style={stylesHeader}>
      {!isDraft && (
        <Item href="/edit/draft" icon={<NewModuleIcon />}>
          Create new module
        </Item>
      )}
      {!isSettings && <Item href="/settings">Settings</Item>}
      <Item onClick={onLogOutClick}>Log out</Item>

      {(isFlashcards || isWrite) && !isSR && <Divider>Options:</Divider>}

      {isFlashcards && !isSR && (
        <Item onClick={clickShuffle} icon={<ShuffleIcon />} active={shuffled}>
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
