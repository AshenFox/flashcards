import {
  getIsDraft,
  getIsFlashcards,
  getIsSettings,
  getIsWrite,
} from "@helpers/functions/determinePath";
import { useActions, useAppSelector } from "@store/hooks";
import { NewModuleIcon, ShuffleIcon } from "@ui/Icons";
import Portal from "@ui/Portal";
import clsx from "clsx";
import { useRouter } from "next/router";
import {
  CSSProperties,
  memo,
  MouseEvent as ReactMouseEvent,
  useCallback,
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
    setDropdown,
    endFlashcardsEarly,
    endWriteEarly,
  } = useActions();

  const shuffled = useAppSelector(s => s.game.flashcards.shuffled);
  const dropdown_active = useAppSelector(s => s.header.dropdown_active);
  const header_height = useAppSelector(s => s.dimen.header_height);
  const flashcards_ended_early = useAppSelector(
    s => s.game.flashcards.ended_early,
  );
  const write_ended_early = useAppSelector(s => s.game.write.ended_early);
  const flashcards_progress = useAppSelector(s => s.game.flashcards.progress);
  const write_remaining = useAppSelector(s => s.game.write.remaining);
  const write_answered = useAppSelector(s => s.game.write.answered);
  const write_is_init = useAppSelector(s => s.game.write.is_init);
  const main_cards = useAppSelector(s => s.main.cards);

  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === "sr";

  const isFlashcards = getIsFlashcards(router.pathname);
  const isWrite = getIsWrite(router.pathname);
  const isDraft = getIsDraft(router.asPath);
  const isSettings = getIsSettings(router.pathname);

  const deactivateDropdown = useCallback(
    (e: MouseEvent) => {
      const menuEl = (e.target as HTMLElement).closest(".header__menu");
      const menuItemEl = (e.target as HTMLElement).closest(
        ".header__menu-item",
      );

      if (menuEl) {
        if (menuItemEl) setDropdown({ value: false });
      } else {
        setDropdown({ value: false });
      }
    },
    [setDropdown],
  );

  const deactivateDropdownRef = useRef(deactivateDropdown);
  deactivateDropdownRef.current = deactivateDropdown;

  useEffect(() => {
    const callback = deactivateDropdownRef.current;

    setTimeout(
      () =>
        dropdown_active
          ? window.addEventListener("click", callback)
          : window.removeEventListener("click", callback),
      0,
    );
    return () => window.removeEventListener("click", callback);
  }, [dropdown_active]);

  const clickShuffle = (_e: ReactMouseEvent<HTMLButtonElement>) => {
    if (shuffled) {
      sortFlashcards();
      setFlashcardsShuffled({ value: false });
    } else {
      shuffleFlashcards();
      setFlashcardsShuffled({ value: true });
    }

    resetFlashcardsProgress();
  };

  const clickStartOver = (_e: ReactMouseEvent<HTMLButtonElement>) =>
    prepareWrite();

  const flashcards_at_end =
    Object.values(main_cards).length === flashcards_progress ||
    flashcards_ended_early;
  const write_is_game_finished =
    !write_remaining.length &&
    !write_answered.filter(item => item.answer === "incorrect").length &&
    write_is_init;
  const write_at_end = write_is_game_finished || write_ended_early;

  const clickEndGame = (_e: ReactMouseEvent<HTMLButtonElement>) => {
    if (isFlashcards) endFlashcardsEarly();
    else endWriteEarly();
  };

  const showEndGameItem =
    (isFlashcards || isWrite) &&
    !(isFlashcards && flashcards_at_end) &&
    !(isWrite && write_at_end);

  const onLogOutClick = (_e: ReactMouseEvent<HTMLButtonElement>) => logOut();

  const stylesHeader: CSSProperties = {
    paddingTop: `${header_height - 1}px`,
  };

  const className = clsx(
    s.dropdown,
    dropdown_active && s.active,
    (isFlashcards || isWrite) && s.isGame,
  );

  return (
    <Portal>
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
        {showEndGameItem && <Item onClick={clickEndGame}>End game</Item>}
      </div>
    </Portal>
  );
};

export default memo(Dropdown);
