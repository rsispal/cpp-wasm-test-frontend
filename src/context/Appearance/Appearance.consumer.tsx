/* Libraries */
import { Context, useContext } from "react";

/* Context */
import AppearanceContext from "./Appearance.context";

/* Types */
import { AppearanceProviderState } from "./Appearance.types";

export const useAppearance = (): AppearanceProviderState => {
  const context = useContext<AppearanceProviderState>(AppearanceContext as unknown as Context<AppearanceProviderState>);
  if (context === undefined) {
    throw new Error("useAppearance must be used within a AppearanceProvider");
  }

  return context;
};
