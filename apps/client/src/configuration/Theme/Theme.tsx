import { ThemeProvider, useTheme } from "next-themes";
import { memo, ReactNode, useEffect } from "react";

import { type ResolvedTheme,setThemeCookie } from "./themeCookie";

type ThemeProps = {
  children: ReactNode;
  initialTheme: ResolvedTheme | null;
};

const ThemeCookieSync = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme === "light" || resolvedTheme === "dark") {
      setThemeCookie(resolvedTheme);
    }
  }, [resolvedTheme]);

  return null;
};

const Theme = ({ children, initialTheme }: ThemeProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={initialTheme ?? "system"}
      enableSystem
      disableTransitionOnChange
    >
      <ThemeCookieSync />
      {children}
    </ThemeProvider>
  );
};

export default memo(Theme);
