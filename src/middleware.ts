import {
  getDefaultTenantSlug,
  getDevModeTenantSlug,
  resolveTenantSlugFromUrl,
} from "@/lib/tenancy";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files
const NONE_TENANT_PATHS = [
  "/",
  "/create-account",
  "/create-account/complete",
  "/create-account/subscription",
  "/create-account/subscription-success",
];

export async function middleware(req: NextRequest) {
  // Clone the URL
  const url = req.nextUrl.clone();

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) return;

  // Skip none-tenant routes
  if (NONE_TENANT_PATHS.some((path) => url.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const host = req.headers.get("host");

  const tenantSlug =
    getDefaultTenantSlug() ??
    resolveTenantSlugFromUrl(host) ??
    getDevModeTenantSlug();

  if (tenantSlug) {
    // tenantSlug available, rewriting
    url.pathname = `/${tenantSlug}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // this is when we want to put the whole application in maintenance mode
  // if (!url.pathname.includes("/error/maintenance")) {
  //   url.pathname = `/error/maintenance`;

  //   return NextResponse.redirect(url);
  // }
  return NextResponse.next();
}
