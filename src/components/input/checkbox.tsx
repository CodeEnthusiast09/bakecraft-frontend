import { forwardRef, useId } from "react";
import { InputProps } from "./type";
import clsx from "clsx";

export const Checkbox = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      label,
      className,
      labelClassName,
      type = "text",
      readOnly = false,
      placeholder,
      defaultChecked,
      value,
      onChange,
      radius = "rounded-md",
      leftIcon,
      ...rest
    },
    ref
  ) => {
    const id = useId();
    return (
      <div className="py-3">
        <div className="flex items-center gap-2 text-sm">
          <input
            aria-invalid={error ? "true" : "false"}
            type="checkbox"
            name="feeback"
            className="accent-secondary-500 rounded-full"
            id={id}
            readOnly={readOnly}
            value={value}
            defaultChecked={defaultChecked}
            ref={ref}
            onChange={onChange ? onChange : undefined}
            {...rest}
          />
          <label className={
            clsx("cursor-pointer text-gray-500", labelClassName)
          } htmlFor={id}>
            {label}
          </label>
        </div>
        <p className="text-red-500 text-xs">{error?.message}</p>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
