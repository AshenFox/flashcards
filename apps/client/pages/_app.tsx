import "@styles/main.scss";
import "react-loading-skeleton/dist/skeleton.css";

import { queryClient } from "@api/queryClient";
import Head from "@configuration/Head";
import PasteControl from "@configuration/PasteControl";
import TabUpdateController from "@configuration/TabUpdateController";
import Theme, { parseThemeFromCookie } from "@configuration/Theme";
import Voice from "@configuration/Voice";
import type { UserDto } from "@flashcards/common";
import AppWrapper from "@modules/AppWrapper";
import AuthProvider from "@modules/AuthProvider";
import AuthSpinner from "@modules/AuthSpinner";
import Dropdown from "@modules/Dropdown";
import Header from "@modules/Header";
import ModalRenderer from "@modules/Modal";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppContext, AppProps } from "next/app";

type MyAppProps = AppProps & {
  initialTheme: "light" | "dark" | null;
  initialUser: UserDto | null | undefined;
};

const MyApp = ({
  Component,
  pageProps,
  initialTheme,
  initialUser,
}: MyAppProps) => (
  <QueryClientProvider client={queryClient}>
    <Theme initialTheme={initialTheme}>
      <Head initialTheme={initialTheme} />
      <AuthProvider initialUser={initialUser}>
        <AppWrapper>
          <Header />
          <Component {...pageProps} />
          <Dropdown />
        </AppWrapper>
      </AuthProvider>
      <AuthSpinner />
      <ModalRenderer />
      <Voice />
      <TabUpdateController />
      <PasteControl />
    </Theme>
  </QueryClientProvider>
);

MyApp.getInitialProps = ({ ctx }: AppContext) => {
  const cookieHeader = ctx.req?.headers?.cookie;
  const initialTheme = parseThemeFromCookie(cookieHeader);
  // The Express auth guard already resolved the session for this request and
  // attached it to req.user (see apps/server/src/index.ts). Read it here to
  // seed the store — no extra fetch. On client navigations ctx.req is absent,
  // so initialUser stays undefined and the live store value is preserved.
  const initialUser = ctx.req ? (ctx.req.user ?? null) : undefined;
  return { initialTheme, initialUser };
};

export default MyApp;
