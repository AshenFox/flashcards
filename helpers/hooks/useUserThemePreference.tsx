import { useIsMounted } from "./useIsMounted";

export const useUserThemePreference = () => {
  const isMounted = useIsMounted();

  let preference: "light" | "dark" | null = null;

  if (isMounted) {
    const { matchMedia } = window;
    preference =
      matchMedia && matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }

  return preference;
};
