import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

const Document = () => {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width initial-scale=1" />
        <meta name="application-name" content="Flash Cards" />
        {/* Fonts */}
        <meta charSet="UTF-8" />
        <link
          href="https://fonts.googleapis.com/css?family=Alata&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
