import { createContext } from "react";
import { Appearance, ContextState } from "./Appearance.types";

const initialState: ContextState = {
  appearance: Appearance.LIGHT_APPEARANCE,
};

export default createContext(initialState);
