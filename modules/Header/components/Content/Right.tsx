import { getIsDraft, getIsGame } from "@helpers/functions/determinePath";
import { useActions } from "@store/hooks";
import { useAppSelector } from "@store/store";
import { NewModuleIcon } from "@ui/Icons";
import { useRouter } from "next/router";
import {
  memo,
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";

import Hamburger from "./components/Hamburger";
import Item from "./components/Item";
import s from "./styles.module.scss";

type Theme = "light" | "dark";

const Right = () => {
  const { change_modal, toggle_modal, set_dropdown, log_out } = useActions();

  const router = useRouter();

  const user = useAppSelector(s => s.auth.user);
  const dropdown_active = useAppSelector(s => s.header.dropdown_active);

  const isDraft = getIsDraft(router.asPath);
  const isGame = getIsGame(router.pathname);

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

  // temporary theme logic
  const [theme, setTheme] = useState<Theme>("light");

  const changeTheme: MouseEventHandler = e => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    const classList = document.querySelector("body").classList;
    localStorage.setItem("theme", newTheme);
    classList.remove(theme);
    classList.add(newTheme);
  };

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) ?? "light";
    setTheme(savedTheme);
    const classList = document.querySelector("body").classList;
    classList.add(savedTheme);
  }, []);

  return (
    <div className={s.right}>
      <Item onClick={changeTheme}>{theme}</Item>
      {user ? (
        <>
          {!isDraft && (
            <Item
              href="/edit/draft"
              icon={<NewModuleIcon />}
              className={isGame ? s.hide_max_tablet : s.hide_max_mobile}
            >
              Create new module
            </Item>
          )}

          <Item
            onClick={log_out}
            className={isGame ? s.hide_max_tablet : s.hide_max_mobile}
          >
            Log out
          </Item>

          <Hamburger
            active={dropdown_active}
            onClick={activateDropdown}
            className={isGame ? s.hide_min_tablet : s.hide_min_mobile}
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
