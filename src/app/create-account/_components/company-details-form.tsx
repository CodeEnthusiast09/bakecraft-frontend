"use client";

import { Input } from "@/components/input";
import { useTenantSignUp } from "@/hooks/services";
import { SubmitHandler, useForm } from "react-hook-form";
import { tenantSignUpValidationSchema } from "@/validations";
import { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/button";

export const CompanyDetailsForm = () => {
  const { mutate: signUp, isPending: isSubmitting } = useTenantSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tenantSignUpValidationSchema),
  });

  const handleSignUp: SubmitHandler<
    InferType<typeof tenantSignUpValidationSchema>
  > = (data) => signUp({ data });

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

      <Input
        label="Official Email"
        type="text"
        placeholder="Enter Company Email"
        error={errors?.companyEmail}
        {...register("companyEmail", { required: true })}
        showRequiredAsterik
      />

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
