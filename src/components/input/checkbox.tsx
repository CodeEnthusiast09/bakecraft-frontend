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
            className="accent-secondary-200 rounded appearance-none w-5 h-5 border-2 border-gray-300 checked:bg-secondary-200 checked:border-secondary-200 relative before:content-[''] before:absolute before:top-0.5 before:left-1 before:w-1.5 before:h-2.5 before:border-white before:border-r-2 before:border-b-2 before:transform before:rotate-45 before:scale-0 checked:before:scale-100 before:transition-transform"
            id={id}
            readOnly={readOnly}
            value={value}
            defaultChecked={defaultChecked}
            ref={ref}
            onChange={onChange ? onChange : undefined}
            {...rest}
          />
          <label
            className={clsx("cursor-pointer text-gray-500", labelClassName)}
            htmlFor={id}
          >
            {label}
          </label>
        </div>
        <p className="text-red-500 text-xs">{error?.message}</p>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
