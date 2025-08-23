export const resolveTenantSlugFromUrl = (host?: string | null) => {
  let tenantSlug: string | null = null;
  if (!host && typeof window !== "undefined") {
    // On client side, get the host from window
    host = window.location.host;
  }
  if (host && host.includes(".")) {
    const candidate = host.split(".")?.[0];
    if (candidate && !candidate.includes("localhost")) {
      // Valid candidate
      tenantSlug = candidate;
    }
  }
  return tenantSlug;
};

export const getDefaultTenantSlug = () => {
  // check if there is a default slug
  if (process.env.NEXT_PUBLIC_DEFAULT_TENANT_SLUG) {
    if (process.env.NODE_ENV === "development") {
      console.log(
        `>>>> DEFAULT TENANT SLUG:  ${process.env.NEXT_PUBLIC_DEFAULT_TENANT_SLUG}`
      );
    }
    // return tenant slug
    return process.env.NEXT_PUBLIC_DEFAULT_TENANT_SLUG;
  }

  return null;
};

export const getDevModeTenantSlug = () => {
  // check if env is development
  if (process.env.NODE_ENV === "development") {
    // check if tenant slug is available
    if (process.env.NEXT_PUBLIC_DEV_MODE_TENANT_SLUG) {
      console.log(
        `>>>> DEV MODE TENANT SLUG:  ${process.env.NEXT_PUBLIC_DEV_MODE_TENANT_SLUG}`
      );

      // return tenant slug
      return process.env.NEXT_PUBLIC_DEV_MODE_TENANT_SLUG;
    }
  }

  return null;
};
