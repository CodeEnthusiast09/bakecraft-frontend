// "use client";

// import { useDomIsReady } from "@/hooks/common";
// import { retrieveFromLocalStorage } from "@/lib/localStorage";
// import { useRouter } from "next/navigation";
// import { ReactNode, useEffect } from "react";

// export const Wrapper = ({ children }: { children: ReactNode }) => {
//   const token = retrieveFromLocalStorage("token");
//   const router = useRouter();

//   const { isReady } = useDomIsReady();

//   useEffect(() => {
//     if (isReady && token) {
//       router.replace(`/dashboard`);
//     }
//   }, [isReady, token]); // eslint-disable-line react-hooks/exhaustive-deps

//   return children;
// };

"use client";

import { useDomIsReady } from "@/hooks/common";
import { retrieveFromLocalStorage } from "@/lib/localStorage";
import { useParams, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  const token = retrieveFromLocalStorage("token");
  const router = useRouter();
  const params = useParams();

  const { isReady } = useDomIsReady();

  useEffect(() => {
    if (isReady && token) {
      const tenantSlug = params?.["tenant-slug"] || "demo";
      router.replace(`/${tenantSlug}/dashboard`);
    }
  }, [isReady, token]); // eslint-disable-line react-hooks/exhaustive-deps

  return children;
};
