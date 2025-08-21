"use client";
import React, { useId } from "react";
import { useController } from "react-hook-form";

export type Option = {
  label: string;
  value: string;
};

export const RadioInput = ({
  label,
  error,
  name,
  options,
  control,
  labelClassName,
  defaultValue,
  showRequiredAsterik = false,

  wrapperClassName = ""
}: any) => {
  const { field } = useController({
    name,
    control,
    defaultValue,
    shouldUnregister: true,
    rules: { required: true },

  });

  return (
    <div className="py-3">
      {label && (
        <label
          className={`flex items-center text-xs font-medium gap-1 text-gray-500  ${labelClassName ? labelClassName : "text-gray-500"
            }`}
        >
          {label}

          {showRequiredAsterik && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className={wrapperClassName}>
        {options?.map((option: Option, index: number) => (
          <RadioOption key={index} option={option} labelClassName={labelClassName} field={field} />
        ))}
      </div>
      <p className="capitalize text-red-500 text-xs">{error?.message}</p>
    </div>
  );
};


const RadioOption = ({ option, field, labelClassName }: { option: Option, field: any, labelClassName?: string }) => {
  const id = useId()

  return (
    <div className="flex gap-4">
      <input
        type="radio"
        id={id}
        value={option.value}
        checked={field.value === option.value}
        onChange={(event) => field.onChange(event.target.value)}
        className={`h-4 w-4 p-2  border border-slate-300 px-3`}
      />

      <label
        htmlFor={id}
        className={`mb-2 flex items-center gap-2 text-xs font-medium text-gray-500 ${labelClassName}`}
      >
        {option.label}
      </label>
    </div>
  )
}
