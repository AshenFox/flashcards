import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { MoonIcon, SunIcon } from "@ui/Icons";
import { Button, Link } from "@ui/InteractiveElement";
import { useTheme } from "next-themes";
import React, { memo, MouseEventHandler, useEffect, useState } from "react";

import s from "./styles.module.scss";

type Theme = "light" | "dark";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const changeTheme: MouseEventHandler = () => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
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
                {theme === "dark" ? "light" : "dark"}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </ContentWrapper>
  );
};

export default memo(Settings);
