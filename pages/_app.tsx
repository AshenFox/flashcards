import "../styles/main.scss";
import "react-loading-skeleton/dist/skeleton.css";

import AuthSpinner from "@modules/AuthSpinner";
import AuthWrapper from "@modules/AuthWrapper";
import Dropdown from "@modules/Dropdown";
import Head from "@modules/Head";
import Header from "@modules/Header";
import PasteControl from "@modules/PasteControl";
import RouterConfiguration from "@modules/RouterConfiguration";
import TabUpdateController from "@modules/TabUpdateController";
import Voice from "@modules/Voice";
import store from "@store/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
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
  </>
);

export default MyApp;
