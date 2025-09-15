"use client";

import { Button } from "@/components/button";
import { useRequestActivationEmail } from "@/hooks/services";
import { retrieveFromLocalStorage } from "@/lib/localStorage";

export const ResendEmailButton = () => {
  const { mutate, isPending: isSubmitting } = useRequestActivationEmail();

  const resendEmail = () => {
    const email = retrieveFromLocalStorage("email");
    if (email) mutate({ data: { email } });
  };

  return (
    <Button
      onClick={resendEmail}
      className="border-none text-secondary-500 w-24 font-medium"
      variant="transparent"
      isLoading={isSubmitting}
    >
      Resend&nbsp;Link
    </Button>
  );
};
