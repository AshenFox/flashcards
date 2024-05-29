import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { useIsMounted } from "@helpers/hooks/useIsMounted";
import { useUserThemePreference } from "@helpers/hooks/useUserThemePreference";
import { MoonIcon, SunIcon } from "@ui/Icons";
import { Button, Link } from "@ui/InteractiveElement";
import { useTheme } from "next-themes";
import React, { memo, MouseEventHandler } from "react";

import s from "./styles.module.scss";

const Settings = () => {
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

  return (
    <ContentWrapper tagType="main">
      <Container>
        <div className={s.settings}>
          <div className={s.header}>
            <h1 className={s.title}>Settings</h1>
            <Link href={"/home/modules"}>Return</Link>
          </div>
          <div className={s.theme}>
            {isMounted && (
              <Button
                onClick={changeTheme}
                design={"plain"}
                icon={theme === "dark" ? <SunIcon /> : <MoonIcon />}
                iconSize={25}
              >
                {theme === "dark" ||
                (theme === "system" && preference === "dark")
                  ? "light"
                  : "dark"}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </ContentWrapper>
  );
};

export default memo(Settings);
