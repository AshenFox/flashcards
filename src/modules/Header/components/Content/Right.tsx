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
  const { change_modal, toggle_modal, set_dropdown, log_out } = useActions();

  const router = useRouter();

  const user = useAppSelector(s => s.auth.user);
  const dropdown_active = useAppSelector(s => s.header.dropdown_active);

  const isDraft = getIsDraft(router.asPath);
  const isGame = getIsGame(router.pathname);
  const isSettings = getIsSettings(router.pathname);

  const activateDropdown = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      set_dropdown(true);
    },
    [set_dropdown],
  );

  const openModal = useCallback(
    (value: "log_in" | "sign_up") => (e: MouseEvent<HTMLButtonElement>) => {
      change_modal(value);
      toggle_modal();
    },
    [change_modal, toggle_modal],
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

          <Item onClick={log_out} className={clsx(s.item, isGame && s.isGame)}>
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
