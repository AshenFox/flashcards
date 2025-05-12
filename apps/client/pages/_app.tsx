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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Theme>
      <Head />
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

export default MyApp;
