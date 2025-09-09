"use client";
import { Card } from "@/components/card";
import { ActivateAccountForm } from "./_components/form";
import { useVerifyActivateAccount } from "@/hooks/services";
import { RequestActivationForm } from "./_components/request-activation";
import { AiOutlineLoading } from "react-icons/ai";

export default function Page() {
  const { isPending: isVerifying, isSuccess } = useVerifyActivateAccount();
  return (
    <Card className="md:w-2/3 lg:w-2/4 xl:w-1/4 mx-auto rounded-2xl px-9 py-12">
      {isVerifying && (
        <div className="h-56 flex items-center justify-center">
          <AiOutlineLoading className="text-4xl animate-spin infinite" />
        </div>
      )}

      {isSuccess && !isVerifying && (
        <>
          <h1 className="text-2xl lg:text-3xl text-primary-500 font-semibold text-center ">
            Welcome!
          </h1>
          <div className="text-sm text-neutral-500 text-center mt-3 mb-10">
            Activate your account by creating a{" "}
            <br className="hidden md:block" /> password
          </div>

          <ActivateAccountForm />
        </>
      )}

      {!isSuccess && !isVerifying && <RequestActivationForm />}
    </Card>
  );
}
