"use client";

import { Button } from "@/components/button";
import { DebouncedInput } from "@/components/input/debounce-input";
import { SearchBoxProps } from "./types";
import { useSearchBox } from "@/hooks/common/useSearchBox";
import { IoIosSearch } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

export const ExpandableSearch = ({
  className,
  buttonTitle,
  buttonIcon = (
    <IoIosSearch size={28} className="text-primary-100 cursor-pointer" />
  ),
  trigerButtonClass,
  triggerButtonVariant = "transparent",
  trigerButtonJustifyContent,
  placeholder = "Search here...",
  show = null,
  onShowCallback,
  onCloseCallback,
}: SearchBoxProps) => {
  const { ref, showSearch, setShowSearch } = useSearchBox({ show });

  return (
    <div ref={ref} className={`relative ${className || ""}`}>
      <AnimatePresence mode="wait" initial={false}>
        {showSearch ? (
          <motion.div
            key="searchbox"
            initial={{ width: 40, opacity: 0 }}
            animate={{ width: 388, opacity: 1 }} // 72 * 4 = 288px
            exit={{ width: 40, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="rounded-md px-2 w-72 md:w-96 bg-secondary-300"
          >
            <DebouncedInput
              value=""
              onChange={(val) => console.log("Searching:", val)}
              placeholder={placeholder}
              debounce={300}
              leftIcon={
                <IoIosSearch
                  size={24}
                  className="text-primary-100 cursor-pointer"
                />
              }
              aria-label={placeholder}
              autoFocus
            />
          </motion.div>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              type="button"
              onClick={() => {
                setShowSearch(true);
                onShowCallback?.();
              }}
              variant={triggerButtonVariant}
              className={`flex items-center h-10 gap-1 ${trigerButtonClass}`}
              justifyContent={trigerButtonJustifyContent}
            >
              {buttonIcon}
              {buttonTitle}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
