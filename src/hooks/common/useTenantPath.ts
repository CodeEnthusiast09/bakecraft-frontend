"use client";

import { useEffect, useState } from "react";
import { tenantPath } from "@/lib/tenantRouter";

export const useTenantPath = (
  path: string ,
  opts: { tenantScoped?: boolean } = {}
) => {
  const [resolvedPath, setResolvedPath] = useState(path);

  useEffect(() => {
    setResolvedPath(tenantPath(path, opts));
  }, [path, opts?.tenantScoped]);

  return resolvedPath;
};
