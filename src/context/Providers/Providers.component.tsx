import { FC } from "react";
import AppearanceProvider from "../Appearance";

export const Providers: FC<{ children: React.ReactNode }> = ({ children }) => <AppearanceProvider>{children}</AppearanceProvider>;
