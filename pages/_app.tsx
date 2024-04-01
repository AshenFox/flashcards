import '../styles/main.scss';
import { Provider } from 'react-redux';
import Head from '@modules/Head';
import AuthWrapper from '@modules/AuthWrapper';
import PasteControl from '@modules/PasteControl';
import RouterConfiguration from '@modules/RouterConfiguration';
import store from '../store/store';
import Voice from '../components/main/Voice';
import Header from '../components/header/Header';
import TabUpdateController from '../components/main/TabUpdateController';
import type { AppProps } from 'next/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head />
    <Provider store={store}>
      <AuthWrapper>
        <Header />
        <Component {...pageProps} />
      </AuthWrapper>
      <TabUpdateController />
      <Voice />
      <RouterConfiguration />
    </Provider>
    <PasteControl />
  </>
);

export default MyApp;
