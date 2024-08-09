import { ReactElement } from "react";

export interface BaseLayoutProps {
  title: string;
  description?: string;
  children: ReactElement | ReactElement[];
}
