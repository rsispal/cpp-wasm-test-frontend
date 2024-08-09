import { useState, useEffect } from "react";

export const useBrowserDarkMode = (enableLogging: boolean = false) => {
  const isWindowDefined = typeof window !== "undefined";
  const queryBrowserPreference = () => isWindowDefined && window.matchMedia("(prefers-color-scheme: dark)").matches === true;

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => queryBrowserPreference());

  useEffect(() => {
    if (isWindowDefined) {
      if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", ({ matches: darkModeState }) => setIsDarkMode(darkModeState === true));
      }
      return function cleanup() {
        window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", () => undefined);
      };
    }
  }, [isWindowDefined]);

  enableLogging && console.log(`Dark mode is ${isDarkMode ? "🌙 on" : "🌞 off"}`);

  return isDarkMode;
};
