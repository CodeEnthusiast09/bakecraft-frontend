"use client";

import { useEffect, useRef, useState } from "react";

export const useSearchBox = ({ show }: { show?: boolean | null } = {}) => {
  const [showSearch, setShowSearch] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // sync with external show prop
  useEffect(() => {
    if (show === true) setShowSearch(true);
    else if (show === false) setShowSearch(false);
  }, [show]);

  // close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };
    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  return { ref, showSearch, setShowSearch };
};
