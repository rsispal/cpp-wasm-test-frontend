"use client";
import { useState, useEffect } from "react";
import { useScript } from "../useScript";

export function useWASM<T>(scriptPath: string, name: string): [boolean, T | undefined] {
  const lib = useScript(scriptPath, name);
  const [wasm, setWASM] = useState<T>();

  useEffect(() => {
    // @ts-expect-error
    if (!!window && !wasm && window[name]) {
      // @ts-expect-error
      window[name]().then((Lib) => setWASM(Lib));
    }
    if (lib) {
      console.log(lib[name]);
    }
  }, [lib, wasm]);

  return [!!wasm, wasm];
}
