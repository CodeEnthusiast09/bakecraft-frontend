"use client";

import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import Link from "next/link";
import { useSignUp } from "@/hooks/services";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUpValidationSchema } from "@/validations";
import { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SignUpPayload,
  TenantStepData,
  tenantStepSchema,
} from "../_validations/signup-validation";
import { SignUpStorage } from "../_lib/signup-storage";
import { Button } from "@/components/button";

type CompanyDetailsFormProps = {
  returnUrl?: string | null;
};

export const CompanyDetailsForm = ({ returnUrl }: CompanyDetailsFormProps) => {
  const { mutate: signUp, isPending: isSubmitting } = useSignUp(returnUrl);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tenantStepSchema),
  });

  const handleSignUp: SubmitHandler<TenantStepData> = (tenantData) => {
    // Save tenant step
    SignUpStorage.save({ tenant: tenantData });

    // Rebuild full payload
    const draft = SignUpStorage.get();
    if (!draft?.user || !draft?.password || !draft?.tenant) {
      console.error("Missing signup data in storage", draft);
      return;
    }

    const payload: SignUpPayload = {
      user: { ...draft.user, ...draft.password },
      tenant: draft.tenant,
    };

    // Call API
    signUp({ data: payload });

    // Clear draft after submit
    SignUpStorage.clear();
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <Input
        label={"Company Name"}
        type="text"
        placeholder="Company Name"
        error={errors?.companyName}
        {...register("companyName", { required: true })}
        showRequiredAsterik
      />

      {/* Company Address */}
      {/* <Input
        label={"Company Address"}
        placeholder="Enter Company Address"
        error={errors?.companyAddress}
        {...register("companyAddress", { required: true })}
        showRequiredAsterik
      /> */}

      {/* Official Email */}
      <Input
        label="Official Email"
        type="text"
        placeholder="Enter Company Email"
        error={errors?.companyEmail}
        {...register("companyEmail", { required: true })}
        showRequiredAsterik
      />

      {/* Company Phone Number */}
      <Input
        label={"Company Phone Number"}
        type="text"
        placeholder="Enter Company Phone Number"
        error={errors?.companyPhoneNumber}
        {...register("companyPhoneNumber", { required: true })}
        showRequiredAsterik
      />

      <div className="pt-8">
        <Button
          type="submit"
          variant="primary"
          className="w-full cursor-pointer text-[20px] font-bold whitespace-nowrap"
          isLoading={isSubmitting}
        >
          Submit
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
