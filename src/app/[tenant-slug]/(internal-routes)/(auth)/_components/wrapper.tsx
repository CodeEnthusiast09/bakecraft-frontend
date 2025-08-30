"use client";

import { useDomIsReady } from "@/hooks/common";
import { retrieveFromLocalStorage } from "@/lib/localStorage";
import { tenantPath } from "@/lib/tenantRouter";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  const token = retrieveFromLocalStorage("token");
  const router = useRouter();

  const { isReady } = useDomIsReady();

  useEffect(() => {
    if (isReady && token) {
      router.replace(tenantPath("dashboard", { tenantScoped: true }));
    }
  }, [isReady, token]);

  return children;
};
