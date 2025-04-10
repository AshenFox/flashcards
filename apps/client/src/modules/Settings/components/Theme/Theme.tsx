import { useIsMounted } from "@helpers/hooks/useIsMounted";
import { useUserThemePreference } from "@helpers/hooks/useUserThemePreference";
import { MoonIcon, SunIcon } from "@ui/Icons";
import { Button } from "@ui/InteractiveElement";
import { useTheme } from "next-themes";
import React, { memo, MouseEventHandler } from "react";

import s from "./styles.module.scss";

const Theme = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();
  const preference = useUserThemePreference();

  const changeTheme: MouseEventHandler = () => {
    if (theme === "system") {
      setTheme(preference === "dark" ? "light" : "dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (!isMounted) return null;

  return (
    <Button
      onClick={changeTheme}
      className={s.theme}
      design={"plain"}
      icon={theme === "dark" ? <SunIcon /> : <MoonIcon />}
      iconSize={25}
    >
      {theme === "dark" || (theme === "system" && preference === "dark")
        ? "light"
        : "dark"}
    </Button>
  );
};

export default memo(Theme);
