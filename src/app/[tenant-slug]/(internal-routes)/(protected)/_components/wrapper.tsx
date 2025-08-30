"use client";

import { useDomIsReady } from "@/hooks/common";
import { retrieveFromLocalStorage } from "@/lib/localStorage";
import { tenantPath } from "@/lib/tenantRouter";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  const token = retrieveFromLocalStorage("token");
  const router = useRouter();
  const pathname = usePathname();

  const { isReady } = useDomIsReady();

  useEffect(() => {
    if (isReady && !token) {
      router.replace(tenantPath(`/?returnUrl=${pathname}`));
    }
  }, [isReady, token]);

  return children;
};
