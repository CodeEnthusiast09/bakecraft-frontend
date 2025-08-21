"use client";

import { InputProps } from "components/input/type";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { forwardRef, useState } from "react";
import { Input } from "components/input";

export const MaskPasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <div className="relative">
        <Input ref={ref} type={showPassword ? "text" : "password"} {...rest} />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[50%]"
          aria-label={showPassword ? "hide password" : "show password"}
        >
          {showPassword ? <GoEye /> : <GoEyeClosed />}
        </button>
      </div>
    );
  }
);

MaskPasswordInput.displayName = "MaskPasswordInput";
