import '../styles/main.scss';
import { Provider } from 'react-redux';
import Head from '@modules/Head';
import AuthWrapper from '@modules/AuthWrapper';
import PasteControl from '@modules/PasteControl';
import RouterConfiguration from '@modules/RouterConfiguration';
import store from '@store/store';
import Voice from '@modules/Voice';
import Header from '@modules/Header';
import TabUpdateController from '@modules/TabUpdateController';
import type { AppProps } from 'next/app';
import AuthSpinner from '@modules/AuthSpinner';
import Dropdown from '@modules/Dropdown';

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
