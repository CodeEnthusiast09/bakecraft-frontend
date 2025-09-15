"use client";
import { Card } from "@/components/card";
import { Form } from "./_components/form";
import { useVerifyForgotPassword } from "@/hooks/services";
import { RiErrorWarningLine } from "react-icons/ri";
import { ResendEmailButton } from "../forgot-password/success/_components/resend-button";
import { AiOutlineLoading } from "react-icons/ai";

export default function Page() {
  const {
    isPending: isVerifying,
    isSuccess,
    isError,
    resetToken,
  } = useVerifyForgotPassword();

  return (
    <Card className="md:w-2/3 lg:w-2/4 xl:w-1/4 mx-auto rounded-2xl px-9 py-12">
      {isVerifying && (
        <div className="h-56 flex items-center justify-center">
          <AiOutlineLoading className="text-4xl animate-spin infinite" />
        </div>
      )}

      {isSuccess && !isVerifying && resetToken && (
        <>
          <h1 className="text-2xl text-primary-500 font-semibold text-center ">
            Enter a New Password
          </h1>
          <div className="text-sm text-neutral-500 text-center mt-3 mb-10">
            Get ready to secure your account again!
          </div>

          <Form resetToken={resetToken} />
        </>
      )}

      {isError && !isVerifying && (
        <>
          <div className="flex justify-center text-3xl text-red-500">
            <RiErrorWarningLine />
          </div>
          <h1 className="text-2xl mt-2 text-red-500 font-semibold text-center ">
            Invalid or expired reset link
          </h1>
          <div className="mt-10 flex items-center text-sm justify-center">
            <span>Need to make a need request?</span>
            <ResendEmailButton />
          </div>
        </>
      )}
    </Card>
  );
}
