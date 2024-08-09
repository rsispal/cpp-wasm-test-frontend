"use client";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

/* Context */
import AppearanceContext from "./Appearance.context";

/* Themes */
import { LightTheme, DarkTheme } from "./theme";

/* Types */
import { Appearance, AppearanceProviderState } from "./Appearance.types";
import { useBrowserDarkMode } from "@/hooks/useBrowserDarkMode";

export const AppearanceProvider: FC<{ children: ReactNode | undefined }> = ({ children }) => {
  const [appearance, setAppearance] = useState<Appearance>(Appearance.DARK_APPEARANCE);
  const [allowAutoSwitching, setAllowAutoSwitching] = useState(true);
  const isDarkMode = useBrowserDarkMode();

  useEffect(() => {
    allowAutoSwitching && changeAppearanceTo(isDarkMode ? Appearance.DARK_APPEARANCE : Appearance.LIGHT_APPEARANCE);
  }, [allowAutoSwitching, isDarkMode]);

  const changeAppearanceTo = (newAppearance: Appearance) => {
    setAppearance(newAppearance);
  };

  const value: AppearanceProviderState = useMemo(
    () => ({
      appearance,
      setLightAppearance: () => changeAppearanceTo(Appearance.LIGHT_APPEARANCE),
      setDarkAppearance: () => changeAppearanceTo(Appearance.DARK_APPEARANCE),
      enableBrowserColourScheme: () => setAllowAutoSwitching(true),
      disableBrowserColourScheme: () => setAllowAutoSwitching(false),
    }),
    [appearance]
  );

  const theme = extendTheme({
    colors: { ...(appearance === Appearance.DARK_APPEARANCE ? DarkTheme : LightTheme) },
  });

  return (
    <AppearanceContext.Provider value={value}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </AppearanceContext.Provider>
  );
};
