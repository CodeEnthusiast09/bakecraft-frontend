"use client";

import { Checkbox } from "@/components/input/checkbox";
import { LinkButton } from "@/components/link-button";
import { MaskPasswordInput } from "@/components/mask-password-input";
import Link from "next/link";
import { useSignUp } from "@/hooks/services";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUpValidationSchema } from "@/validations";
import { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/button";
import {
  PasswordStepData,
  passwordStepSchema,
} from "../_validations/signup-validation";
import { SignUpStorage } from "../_lib/signup-storage";

export const PasswordForm = () => {
  //   const { mutate: signUp, isPending: isSubmitting } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordStepSchema),
  });

  const handleContinue: SubmitHandler<PasswordStepData> = (data) => {
    SignUpStorage.save({ password: data });
    window.location.href = "/create-account/company-details";
  };

  return (
    <form onSubmit={handleSubmit(handleContinue)}>
      <MaskPasswordInput
        label="Create your password"
        placeholder="Enter Password"
        error={errors?.password}
        {...register("password", { required: true })}
        showRequiredAsterik
      />

      {/* <MaskPasswordInput
        label="Create your password"
        placeholder="Enter Password"
        error={errors?.passwordConfirmation}
        {...register("passwordConfirmation", { required: true })}
        showRequiredAsterik
      /> */}

      <div className="flex justify-start">
        <Checkbox />

        <div className="py-3">
          <p className="text-primary-500 text-xs font-normal mb-6">
            By signing up you agree to our
            <span className="text-secondary-100"> Terms of Service </span> and
            <span className="text-secondary-100"> Privacy Policy </span>, which
            outline your rights and obligations with respect to your use of the
            Service and processing of your data.
          </p>
          <p className="text-primary-500 text-xs font-normal">
            We’re committed to protecting your data privacy. Permissions are
            part of our continuing compliance efforts.
          </p>
        </div>
      </div>
      <div className="pt-8">
        <Button
          type="submit"
          variant="primary"
          className="w-full cursor-pointer text-[20px] font-bold whitespace-nowrap"
          //   isLoading={isSubmitting}
        >
          Create Account
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
