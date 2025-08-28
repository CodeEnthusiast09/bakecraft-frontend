import { retrieveFromLocalStorage } from "@/lib/localStorage";
import { Tenant } from "@/interfaces";

/**
 * Builds a route with the tenant slug automatically.
 * Falls back to plain path if no tenant is stored.
 */
export const tenantPath = (path: string = ""): string => {
  const tenant: Tenant | null = retrieveFromLocalStorage("tenant");

  if (tenant?.slug) {
    // Ensure path always starts with "/"
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `/${tenant.slug}${cleanPath}`;
  }

  // fallback for routes that don't need a tenant
  return path || "/";
};
