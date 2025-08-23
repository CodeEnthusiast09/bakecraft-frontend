import {
  getDefaultTenantSlug,
  getDevModeTenantSlug,
  resolveTenantSlugFromUrl,
} from "@/lib/tenancy";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req: NextRequest) {
  // Clone the URL
  const url = req.nextUrl.clone();

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) return;

  const host = req.headers.get("host");

  const tenantSlug =
    getDefaultTenantSlug() ??
    resolveTenantSlugFromUrl(host) ??
    getDevModeTenantSlug();

  if (tenantSlug) {
    // tenantSlug available, rewriting
    url.pathname = `/${tenantSlug}${url.pathname}`;
  }

  // this is when we want to put the whole application in maintenance mode
  // if (!url.pathname.includes("/error/maintenance")) {
  //   url.pathname = `/error/maintenance`;

  //   return NextResponse.redirect(url);
  // }

  return NextResponse.rewrite(url);
}
