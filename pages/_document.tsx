import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

const Document = () => {
  return (
    <Html>
      <Head>
        <meta charSet="UTF-8" />
        {/* Fav icons */}
        <link
          rel="apple-touch-icon-precomposed"
          sizes="57x57"
          href="../fav-icons/dark/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="114x114"
          href="../fav-icons/dark/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="72x72"
          href="../fav-icons/dark/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="144x144"
          href="../fav-icons/dark/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="60x60"
          href="../fav-icons/dark/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="120x120"
          href="../fav-icons/dark/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="76x76"
          href="../fav-icons/dark/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="152x152"
          href="../fav-icons/dark/apple-touch-icon-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="../fav-icons/dark/favicon-196x196.png"
          sizes="196x196"
        />
        <link
          rel="icon"
          type="image/png"
          href="../fav-icons/dark/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="../fav-icons/dark/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="../fav-icons/dark/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="../fav-icons/dark/favicon-128.png"
          sizes="128x128"
        />
        <meta name="application-name" content="Flash Cards" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta
          name="msapplication-TileImage"
          content="../fav-icons/dark/mstile-144x144.png"
        />
        <meta
          name="msapplication-square70x70logo"
          content="../fav-icons/dark/mstile-70x70.png"
        />
        <meta
          name="msapplication-square150x150logo"
          content="../fav-icons/dark/mstile-150x150.png"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="../fav-icons/dark/mstile-310x150.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="../fav-icons/dark/mstile-310x310.png"
        />

        {/* Fonts */}
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
