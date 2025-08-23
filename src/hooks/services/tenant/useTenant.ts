"use client";
import { Tenant } from "@/interfaces";
import { useMemo } from "react";

export const useTenant = ({
  loadFullInfo = false,
}: { loadFullInfo?: boolean } = {}) => {
  // save to storage
  const savedTenantDetails: Tenant = useMemo(() => {
    if (typeof localStorage !== "undefined") {
      const data = localStorage.getItem("tenant");
      if (data) {
        return JSON.parse(data);
      }
    }
    return null;
  }, []);

  const saveToStorage = (tenant: Tenant) => {
    try {
      if (typeof localStorage !== "undefined") {
        const tenantJSON = JSON.stringify(tenant);
        localStorage.setItem("tenant", tenantJSON);
      }
    } catch (error) {
      console.error("Error saving tenant details to localStorage:", error);
    }
  };

  const response = {
    data: savedTenantDetails,
    isPending: false, // will be needed if we ever need to make client call to API for tenant details
    saveToStorage,
  };

  return response;
};
