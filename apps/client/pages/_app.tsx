import "@styles/main.scss";
import "react-loading-skeleton/dist/skeleton.css";

import Head from "@configuration/Head";
import PasteControl from "@configuration/PasteControl";
import TabUpdateController from "@configuration/TabUpdateController";
import Theme from "@configuration/Theme";
import Voice from "@configuration/Voice";
import AuthSpinner from "@modules/AuthSpinner";
import AuthWrapper from "@modules/AuthWrapper";
import Dropdown from "@modules/Dropdown";
import Header from "@modules/Header";
import store from "@store/store";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppContext, AppProps } from "next/app";
import { Provider } from "react-redux";
import { parseThemeFromCookie } from "@configuration/Theme";
import { queryClient } from "@api/queryClient";

type MyAppProps = AppProps & {
  initialTheme: "light" | "dark" | null;
};

const MyApp = ({ Component, pageProps, initialTheme }: MyAppProps) => (
  <QueryClientProvider client={queryClient}>
    <Theme initialTheme={initialTheme}>
      <Head initialTheme={initialTheme} />
      <Provider store={store}>
        <AuthWrapper>
          <Header />
          <Dropdown />
          <Component {...pageProps} />
        </AuthWrapper>
        <AuthSpinner />
        <Voice />
        <TabUpdateController />
      </Provider>
      <PasteControl />
    </Theme>
  </QueryClientProvider>
);

MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  const cookieHeader = ctx.req?.headers?.cookie;
  const initialTheme = parseThemeFromCookie(cookieHeader);
  return { initialTheme };
};

export default MyApp;
