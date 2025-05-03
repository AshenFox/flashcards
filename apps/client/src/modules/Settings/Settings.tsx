import Container from "@components/Container";
import ContentWrapper from "@components/ContentWrapper";
import { Link } from "@ui/InteractiveElement";
import clsx from "clsx";
import React, { memo } from "react";

import PushNotifications from "./components/PushNotifications";
import Theme from "./components/Theme";
import s from "./styles.module.scss";

const Settings = () => {
  return (
    <ContentWrapper tagType="main">
      <Container>
        <div className={s.settings}>
          <div className={s.header}>
            <h1 className={s.title}>Settings</h1>
            <Link isReturn>Return</Link>
          </div>
          <div className={clsx(s.section)}>
            <h2>Theme</h2>
            <div className={s.body}>
              <Theme />
            </div>
          </div>
          <div className={s.section}>
            <h2>Push Notifications</h2>

            <div className={s.body}>
              <PushNotifications />
            </div>
          </div>
        </div>
      </Container>
    </ContentWrapper>
  );
};

export default memo(Settings);
