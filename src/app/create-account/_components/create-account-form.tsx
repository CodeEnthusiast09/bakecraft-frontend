"use client";

import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import Link from "next/link";
import { useSignUp } from "@/hooks/services";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUpValidationSchema } from "@/validations";
import { InferType, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  UserStepData,
  userStepSchema,
} from "../_validations/signup-validation";
import { SignUpStorage } from "../_lib/signup-storage";
import { Button } from "@/components/button";

export const SignUpForm = () => {
  // const { mutate: signUp, isPending: isSubmitting } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userStepSchema),
  });

  const handleContinue: SubmitHandler<UserStepData> = (data) => {
    SignUpStorage.save({ user: data });
    window.location.href = "/create-account/password";
  };

  return (
    <form onSubmit={handleSubmit(handleContinue)}>
      <Input
        label="First Name"
        type="text"
        placeholder="First name"
        error={errors?.firstName}
        {...register("firstName", { required: true })}
        showRequiredAsterik
      />

      <Input
        label="Last Name"
        type="text"
        placeholder="Last name"
        error={errors?.lastName}
        {...register("lastName", { required: true })}
        showRequiredAsterik
      />

      <Input
        label="Email"
        type="text"
        placeholder="you@example.com"
        error={errors?.email}
        {...register("email", { required: true })}
        showRequiredAsterik
      />

      <Input
        label="Phone Number"
        type="text"
        placeholder="Enter phone number"
        error={errors?.phoneNumber}
        {...register("phoneNumber", { required: true })}
        showRequiredAsterik
      />

      <div className="pt-8">
        <Button
          type="submit"
          variant="primary"
          className="w-full cursor-pointer text-[20px] font-bold whitespace-nowrap"
          // isLoading={isSubmitting}
        >
          Continue
        </Button>
      </div>

      {/* <div className="text-lg py-3 flex justify-center items-center">
        <p className="text-[#222222]/50 font-light">
          Already have an account?&nbsp;
        </p>
        <Link className="text-secondary-100" href="/auth/login">
          Log In
        </Link>
      </div> */}
    </form>
  );
};
