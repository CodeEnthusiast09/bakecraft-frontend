"use client";

import { useFieldArray } from "react-hook-form";

type UseAddMultipleOptions = {
  name: string;
  defaultValue: any;
};

export const useAddMultiple = (
  control: any,
  options: UseAddMultipleOptions
) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: options.name,
  });

  const addMore = () => {
    append(options?.defaultValue);
  };

  const removeOne = (index: number) => {
    if (confirm("Are you sure you want to remove this?")) {
      remove(index);
    }
  };

  return { fields, remove: removeOne, addMore };
};
