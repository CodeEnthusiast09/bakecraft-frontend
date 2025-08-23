"use client";

import { useDomIsReady } from "@/hooks/common";
import { retrieveFromLocalStorage } from "@/lib/localStorage";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  const token = retrieveFromLocalStorage("token");
  const router = useRouter();

  const { isReady } = useDomIsReady();

  useEffect(() => {
    if (isReady && token) {
      router.replace(`/dashboard`);
    }
  }, [isReady, token]); // eslint-disable-line react-hooks/exhaustive-deps

  return children;
};
