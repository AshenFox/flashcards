import {
  getIsDraft,
  getIsGame,
  getIsSettings,
} from "@helpers/functions/determinePath";
import LogIn from "@modules/Modal/components/Content/LogIn";
import SignUp from "@modules/Modal/components/Content/SignUp";
import { NewModuleIcon } from "@ui/Icons";
import { useAuthStore } from "@zustand/auth";
import { useLayoutStore } from "@zustand/layout";
import { useModalStore } from "@zustand/modal";
import clsx from "clsx";
import { useRouter } from "next/router";
import { memo, MouseEvent, useCallback } from "react";

import Hamburger from "./components/Hamburger";
import Item from "./components/Item";
import s from "./styles.module.scss";

const Right = () => {
  const open = useModalStore(s => s.open);
  const logOut = useAuthStore(s => s.logOut);

  const router = useRouter();

  const user = useAuthStore(s => s.user);
  const dropdown_active = useLayoutStore(s => s.dropdown_active);
  const setDropdownActive = useLayoutStore(s => s.setDropdownActive);

  const isDraft = getIsDraft(router.asPath);
  const isGame = getIsGame(router.pathname);
  const isSettings = getIsSettings(router.pathname);

  const activateDropdown = useCallback(
    (_e: MouseEvent<HTMLButtonElement>) => {
      setDropdownActive(true);
    },
    [setDropdownActive],
  );

  const openLogInModal = useCallback(
    (_e: MouseEvent<HTMLButtonElement>) => {
      open({ title: "Log in", content: <LogIn /> });
    },
    [open],
  );

  const openSignUpModal = useCallback(
    (_e: MouseEvent<HTMLButtonElement>) => {
      open({ title: "Sign up", content: <SignUp /> });
    },
    [open],
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
          <Item onClick={openLogInModal}>Log in</Item>

          <Item onClick={openSignUpModal} padded>
            Sign up
          </Item>
        </>
      )}
    </div>
  );
};

export default memo(Right);
