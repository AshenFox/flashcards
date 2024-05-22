import { useUserThemePreference } from "@helpers/hooks/useUserThemePreference";
import NextHead from "next/head";
import { useTheme } from "next-themes";
import { memo } from "react";

const Head = () => {
  const { theme } = useTheme();
  const preference = useUserThemePreference();

  const iconsPath =
    theme === "dark" || (theme === "system" && preference === "dark")
      ? "dark"
      : "light";

  return (
    <NextHead>
      <title>Flash Cards</title>
      {/* icons */}
      <link
        rel="apple-touch-icon-precomposed"
        sizes="57x57"
        href={`../fav-icons/${iconsPath}/apple-touch-icon-57x57.png`}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="114x114"
        href={`../fav-icons/${iconsPath}/apple-touch-icon-114x114.png`}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="72x72"
        href={`../fav-icons/${iconsPath}/apple-touch-icon-72x72.png`}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="144x144"
        href={`../fav-icons/${iconsPath}/apple-touch-icon-144x144.png`}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="60x60"
        href={`../fav-icons/${iconsPath}/apple-touch-icon-60x60.png`}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="120x120"
        href={`../fav-icons/${iconsPath}/apple-touch-icon-120x120.png`}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="76x76"
        href={`../fav-icons/${iconsPath}/apple-touch-icon-76x76.png`}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="152x152"
        href={`../fav-icons/${iconsPath}/apple-touch-icon-152x152.png`}
      />
      <link
        rel="icon"
        type="image/png"
        href={`../fav-icons/${iconsPath}/favicon-196x196.png`}
        sizes="196x196"
      />
      <link
        rel="icon"
        type="image/png"
        href={`../fav-icons/${iconsPath}/favicon-96x96.png`}
        sizes="96x96"
      />
      <link
        rel="icon"
        type="image/png"
        href={`../fav-icons/${iconsPath}/favicon-32x32.png`}
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href={`../fav-icons/${iconsPath}/favicon-16x16.png`}
        sizes="16x16"
      />
      <link
        rel="icon"
        type="image/png"
        href={`../fav-icons/${iconsPath}/favicon-128.png`}
        sizes="128x128"
      />
      <meta name="msapplication-TileColor" content="#FFFFFF" />
      <meta
        name="msapplication-TileImage"
        content={`../fav-icons/${iconsPath}/mstile-144x144.png`}
      />
      <meta
        name="msapplication-square70x70logo"
        content={`../fav-icons/${iconsPath}/mstile-70x70.png`}
      />
      <meta
        name="msapplication-square150x150logo"
        content={`../fav-icons/${iconsPath}/mstile-150x150.png`}
      />
      <meta
        name="msapplication-wide310x150logo"
        content={`../fav-icons/${iconsPath}/mstile-310x150.png`}
      />
      <meta
        name="msapplication-square310x310logo"
        content={`../fav-icons/${iconsPath}/mstile-310x310.png`}
      />
    </NextHead>
  );
};

export default memo(Head);
