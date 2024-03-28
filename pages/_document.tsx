import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <meta charSet='UTF-8' />
        <link rel='apple-touch-icon' sizes='180x180' href='../img/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='../img/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='../img/favicon-16x16.png' />
        <link
          href='https://fonts.googleapis.com/css?family=Alata&display=swap'
          rel='stylesheet'
        />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap'
          rel='stylesheet'
        />

        <link
          href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
