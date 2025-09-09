"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useRequestActivationEmail } from "@/hooks/services";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { requestActivationEmailValidationSchema } from "@/validations";
import { InferType } from "yup";

export const RequestActivationForm = () => {
  const router = useRouter();

  const onSuccess = () => {
    router?.push("/activate-account/request/success");
  };
  const { mutate, isPending: isSubmitting } =
    useRequestActivationEmail(onSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(requestActivationEmailValidationSchema),
  });

  const sendToServer: SubmitHandler<
    InferType<typeof requestActivationEmailValidationSchema>
  > = (data) => mutate({ data });

  return (
    <div>
      <div className="bg-secondary-100 flex items-center justify-center rounded-full h-20 w-20 mx-auto mb-10">
        <RiLockPasswordLine className="text-3xl text-secondary-500" />
      </div>
      <h1 className="text-2xl lg:text-3xl text-primary-500 font-semibold text-center ">
        Request activation
      </h1>
      <div className="text-sm text-neutral-500 text-center mt-3 mb-10">
        Please enter the email address that is associated with your account in
        order to request for a new activation link.
      </div>
      <form onSubmit={handleSubmit(sendToServer)} className="mt-6">
        <Input
          label="Email address"
          type="email"
          placeholder="Enter your email"
          leftIcon={<MdOutlineEmail />}
          error={errors.email}
          {...register("email", { required: true })}
        />
        <div className="pt-5">
          <Button
            type="submit"
            className="h-12 block w-full"
            isLoading={isSubmitting}
          >
            Resend link
          </Button>
        </div>
      </form>
    </div>
  );
};
