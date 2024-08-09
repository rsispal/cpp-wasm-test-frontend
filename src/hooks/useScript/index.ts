import { useState, useEffect } from "react";

export const useScript = (url: string, name: string) => {
  const [lib, setLib] = useState<any>(null);

  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${url}"]`);
    if (!existingScript) {
      const script = document.createElement("script");

      script.src = url;
      script.async = true;
      //   @ts-ignore
      script.onload = () => setLib({ [name]: window[name] });

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        setLib(null);
      };
    } else {
      // @ts-ignore
      setLib({ [name]: window[name] });
    }
  }, [url, name]);

  return lib;
};
