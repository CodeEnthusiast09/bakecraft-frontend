"use client";

import { useTenant } from "@/hooks/services/tenant";
import { Tenant } from "@/interfaces";
import { useMemo } from "react";

export const TenancyWrapper = ({
  children,
  tenant,
}: {
  children: React.ReactNode;
  tenant: Tenant;
}) => {
  const { saveToStorage } = useTenant();

  // save basic tenant details to storage for later use
  useMemo(() => {
    saveToStorage(tenant);
  }, [tenant]); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
};
