import "@styles/main.scss";
import "react-loading-skeleton/dist/skeleton.css";

import { queryClient } from "@api/queryClient";
import Head from "@configuration/Head";
import PasteControl from "@configuration/PasteControl";
import TabUpdateController from "@configuration/TabUpdateController";
import Theme, { parseThemeFromCookie } from "@configuration/Theme";
import Voice from "@configuration/Voice";
import {
  AuthStoreProvider,
  getInitialAuthUser,
  type InitialAuthUser,
} from "@features/auth";
import AppWrapper from "@modules/AppWrapper";
import AuthSpinner from "@modules/AuthSpinner";
import Dropdown from "@modules/Dropdown";
import Header from "@modules/Header";
import ModalRenderer from "@modules/Modal";
import * as Tooltip from "@radix-ui/react-tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppContext, AppProps } from "next/app";

type MyAppProps = AppProps & {
  initialTheme: "light" | "dark" | null;
  initialUser: InitialAuthUser;
};

const MyApp = ({
  Component,
  pageProps,
  initialTheme,
  initialUser,
}: MyAppProps) => (
  <QueryClientProvider client={queryClient}>
    <Theme initialTheme={initialTheme}>
      <Tooltip.Provider delayDuration={200} skipDelayDuration={300}>
        <AuthStoreProvider initialUser={initialUser}>
          <Head initialTheme={initialTheme} />
          <AppWrapper>
            <Header />
            <Component {...pageProps} />
            <Dropdown />
          </AppWrapper>
          <AuthSpinner />
          <ModalRenderer />
          <Voice />
          <TabUpdateController />
          <PasteControl />
        </AuthStoreProvider>
      </Tooltip.Provider>
    </Theme>
  </QueryClientProvider>
);

MyApp.getInitialProps = ({ ctx }: AppContext) => {
  const cookieHeader = ctx.req?.headers?.cookie;
  const initialTheme = parseThemeFromCookie(cookieHeader);
  const initialUser = getInitialAuthUser(ctx);

  return { initialTheme, initialUser };
};

export default MyApp;

