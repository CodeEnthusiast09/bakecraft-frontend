"use client";

import { InputProps } from "@/components/input/type";
import { forwardRef, useState } from "react";
import { Input } from "@/components/input";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const MaskPasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <div className="relative">
        <Input ref={ref} type={showPassword ? "text" : "password"} {...rest} />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[58%] text-primary-500"
          aria-label={showPassword ? "hide password" : "show password"}
        >
          {showPassword ? <FiEye size={16.5} /> : <FiEyeOff size={16.5} />}
        </button>
      </div>
    );
  }
);

MaskPasswordInput.displayName = "MaskPasswordInput";
