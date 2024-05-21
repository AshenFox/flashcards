import { useActions } from "@store/hooks";
import Router from "next/router";
import { memo } from "react";
import { useEffect, useRef } from "react";

const RouterConfiguration = () => {
  const { set_main_loading } = useActions();

  const baseRef = useRef<string>(null);

  useEffect(() => {
    Router.events.on("routeChangeComplete", (url: string) => {
      const base = url.match(/\/.[^\/]*/)?.[0];

      if (base !== baseRef.current) set_main_loading(true);

      baseRef.current = base;
    });
  }, []);

  return <></>;
};

export default memo(RouterConfiguration);
