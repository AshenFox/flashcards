import '../styles/main.scss';
import { Provider } from 'react-redux';
import Head from '../components/main/Head';
import store from '../store/store';
import AuthWrapper from '../components/main/AuthWrapper';
import PasteControl from '../components/main/PasteControl';
import Voice from '../components/main/Voice';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head />
      <Provider store={store}>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
        <Voice />
      </Provider>
      <PasteControl />
    </>
  );
}

export default MyApp;

// http://192.168.1.67/
// ipconfig =====
