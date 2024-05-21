"use client";
import { ThemeProvider } from "next-themes";
import { memo, ReactNode } from "react";

type ThemeProps = {
  children: ReactNode;
};

const Theme = ({ children }: ThemeProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

export default memo(Theme);
