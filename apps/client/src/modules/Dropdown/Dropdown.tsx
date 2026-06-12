import {
  getIsDraft,
  getIsFlashcards,
  getIsSettings,
  getIsWrite,
} from "@helpers/functions/determinePath";
import { NewModuleIcon } from "@ui/Icons";
import Portal from "@ui/Portal";
import { useAuthStore } from "@zustand/auth";
import { useLayoutStore } from "@zustand/layout";
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

import GameDropdownOptions from "./components/GameDropdownOptions";
import Item from "./components/Item";
import s from "./styles.module.scss";

const Dropdown = () => {
  const logOut = useAuthStore(s => s.logOut);

  const dropdown_active = useLayoutStore(s => s.dropdown_active);
  const header_height = useLayoutStore(s => s.header_height);
  const setDropdownActive = useLayoutStore(s => s.setDropdownActive);

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
        if (menuItemEl) setDropdownActive(false);
      } else {
        setDropdownActive(false);
      }
    },
    [setDropdownActive],
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

        {(isFlashcards || isWrite) && (
          <GameDropdownOptions
            isFlashcards={isFlashcards}
            isWrite={isWrite}
            isSR={isSR}
          />
        )}
      </div>
    </Portal>
  );
};

export default memo(Dropdown);
