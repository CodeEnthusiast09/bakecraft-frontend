"use client";
import { useEffect, useState } from "react";

export const useDomIsReady = () => {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const handleDomContentLoaded = () => {
      setIsReady(true);
    };

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      setIsReady(true);
    } else {
      document.addEventListener("DOMContentLoaded", handleDomContentLoaded);
    }

    return () => {
      document.removeEventListener("DOMContentLoaded", handleDomContentLoaded);
    };
  }, []);

  return { isReady };
};
