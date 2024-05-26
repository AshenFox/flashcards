import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

const Document = () => {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width initial-scale=1" />
        <meta name="application-name" content="Flash Cards" />
        <meta charSet="UTF-8" />
      </Head>
      <body className="light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
