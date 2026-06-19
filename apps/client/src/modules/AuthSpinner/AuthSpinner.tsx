import Spinner from "@ui/Spinner";
import clsx from "clsx";
import Router from "next/router";
import { memo, useEffect, useState } from "react";

import s from "./styles.module.scss";

// Only reveal the overlay if a navigation runs longer than this, so fast
// transitions don't flash the spinner. Set to 0 to show it on every navigation.
const SHOW_DELAY_MS = 150;

const AuthSpinner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const start = () => {
      timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    };
    const stop = () => {
      if (timer) clearTimeout(timer);
      timer = null;
      setVisible(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", stop);
    Router.events.on("routeChangeError", stop);

    return () => {
      if (timer) clearTimeout(timer);
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", stop);
      Router.events.off("routeChangeError", stop);
    };
  }, []);

  return (
    <div className={clsx(s.container, !visible && s.hidden)}>
      <Spinner />
    </div>
  );
};

export default memo(AuthSpinner);
