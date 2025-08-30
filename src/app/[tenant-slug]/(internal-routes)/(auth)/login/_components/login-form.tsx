"use client";

import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { MaskPasswordInput } from "@/components/mask-password-input";
import Link from "next/link";
import { useSignIn } from "@/hooks/services";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInValidationSchema } from "@/validations";
import { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/button";

export const LoginForm = () => {
  const { mutate: signUp, isPending: isSubmitting } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInValidationSchema),
  });

  const handleSignUp: SubmitHandler<
    InferType<typeof signInValidationSchema>
  > = (data) => signUp({ data });

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <Input
        label="Email Address"
        type="text"
        placeholder="Enter Email"
        error={errors?.email}
        {...register("email", { required: true })}
        showRequiredAsterik
      />

      <MaskPasswordInput
        label="Password"
        type="text"
        placeholder="Enter Password"
        error={errors?.password}
        {...register("password", { required: true })}
        showRequiredAsterik
      />

      <div className="pt-8">
        <Button
          type="submit"
          variant="primary"
          className="w-full cursor-pointer text-[20px] font-bold whitespace-nowrap"
          isLoading={isSubmitting}
        >
          Log in
        </Button>
      </div>

      <div className="text-lg py-3 flex justify-center items-center">
        <p className="text-[#222222]/50 font-light">
          Don’t have an account?&nbsp;
        </p>
        <Link className="text-secondary-100" href="/create-account">
          Create Account
        </Link>
      </div>
    </form>
  );
};
