import {
  getIsDraft,
  getIsGame,
  getIsSettings,
} from "@helpers/functions/determinePath";
import { useActions } from "@store/hooks";
import { useAppSelector } from "@store/store";
import { NewModuleIcon } from "@ui/Icons";
import clsx from "clsx";
import { useRouter } from "next/router";
import { memo, MouseEvent, useCallback } from "react";

import Hamburger from "./components/Hamburger";
import Item from "./components/Item";
import s from "./styles.module.scss";

const Right = () => {
  const { changeModal, toggleModal, setDropdown, logOut } = useActions();

  const router = useRouter();

  const user = useAppSelector(s => s.auth.user);
  const dropdown_active = useAppSelector(s => s.header.dropdown_active);

  const isDraft = getIsDraft(router.asPath);
  const isGame = getIsGame(router.pathname);
  const isSettings = getIsSettings(router.pathname);

  const activateDropdown = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      setDropdown({ value: true });
    },
    [setDropdown],
  );

  const openModal = useCallback(
    (value: "log_in" | "sign_up") => (e: MouseEvent<HTMLButtonElement>) => {
      changeModal({ active_modal: value });
      toggleModal();
    },
    [changeModal, toggleModal],
  );

  return (
    <div className={s.right}>
      {user ? (
        <>
          {!isDraft && (
            <Item
              href="/edit/draft"
              icon={<NewModuleIcon />}
              className={clsx(s.item, isGame && s.isGame)}
            >
              Create new module
            </Item>
          )}

          {!isSettings && (
            <Item href="/settings" className={clsx(s.item, isGame && s.isGame)}>
              Settings
            </Item>
          )}

          <Item onClick={logOut} className={clsx(s.item, isGame && s.isGame)}>
            Log out
          </Item>

          <Hamburger
            active={dropdown_active}
            onClick={activateDropdown}
            className={clsx(s.hamburger, isGame && s.isGame)}
          />
        </>
      ) : (
        <>
          <Item onClick={openModal("log_in")}>Log in</Item>

          <Item onClick={openModal("sign_up")} padded>
            Sign up
          </Item>
        </>
      )}
    </div>
  );
};

export default memo(Right);
