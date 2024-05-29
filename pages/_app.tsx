import "@styles/main.scss";
import "react-loading-skeleton/dist/skeleton.css";

import Head from "@configuration/Head";
import PasteControl from "@configuration/PasteControl";
import RouterConfiguration from "@configuration/RouterConfiguration";
import TabUpdateController from "@configuration/TabUpdateController";
import Theme from "@configuration/Theme";
import Voice from "@configuration/Voice";
import AuthSpinner from "@modules/AuthSpinner";
import AuthWrapper from "@modules/AuthWrapper";
import Dropdown from "@modules/Dropdown";
import Header from "@modules/Header";
import store from "@store/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
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
      <RouterConfiguration />
      <TabUpdateController />
    </Provider>
    <PasteControl />
  </Theme>
);

export default MyApp;
