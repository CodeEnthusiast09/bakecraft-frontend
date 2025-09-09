"use client";

import { useAddMultiple } from "./useAddMultiple";

export const useAddMultipleInviteTeam = (control: any) => {
  return useAddMultiple(control, {
    name: "invites",
    defaultValue: {
      department: "",
      email: "",
      role: "",
    },
  });
};
