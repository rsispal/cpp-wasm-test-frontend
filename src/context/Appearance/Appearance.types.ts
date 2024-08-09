export interface ContextState {
  appearance: Appearance;
}

export interface AppearanceProviderState extends ContextState {
  setLightAppearance: () => void;
  setDarkAppearance: () => void;
  enableBrowserColourScheme: () => void;
  disableBrowserColourScheme: () => void;
}

export enum Appearance {
  LIGHT_APPEARANCE,
  DARK_APPEARANCE,
}
