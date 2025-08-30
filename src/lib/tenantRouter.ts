import { Tenant } from "@/interfaces";
import { retrieveFromLocalStorage } from "./localStorage";

export const tenantPath = (
  path: string = "",
  opts?: { tenantScoped?: boolean }
): string => {
  const tenant: Tenant | null = retrieveFromLocalStorage("tenant");

  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (opts?.tenantScoped && tenant?.slug) {
    return `/${tenant.slug}${cleanPath}`;
  }

  return cleanPath || "/";
};
