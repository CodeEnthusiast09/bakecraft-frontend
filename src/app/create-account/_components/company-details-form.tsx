"use client";

import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
// import { MaskPasswordInput } from "components/mask-password-input";
// import { Select } from "components/select";
import Link from "next/link";
// import { useSignUp } from "hooks";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { signUpValidationSchema } from "validations";
// import { InferType } from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

export const CompanyDetailsForm = () => {
  //   const { mutate: signUp, isPending: isSubmitting } = useSignUp();

  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm({
  //     resolver: yupResolver(signUpValidationSchema),
  //   });

  //   const handleSignUp: SubmitHandler<
  //     InferType<typeof signUpValidationSchema>
  //   > = (data) => signUp({ data });

  return (
    <form
    //     onSubmit={handleSubmit(handleSignUp)}
    >
      <Input label={"Company Name"} id="companyName" />

      {/* Company Address */}
      <Input
        label={"Company Address"}
        id="companyAddress"
        placeholder="Enter Company Address"
      />

      {/* Official Email */}
      <Input
        label={"Official Email"}
        id="officialEmail"
        type="email"
        placeholder="Enter Company Email"
      />

      {/* Company Phone Number */}
      <Input
        label={"Company Phone Number"}
        id="companyPhone"
        type="tel"
        placeholder="Enter Company Phone Number"
      />

      <div className="pt-8">
        <LinkButton
          href="/create-account/subscription"
          variant="primary"
          className="w-full cursor-pointer text-[20px] font-bold whitespace-nowrap"
          //   isLoading={isSubmitting}
        >
          Submit
        </LinkButton>
      </div>

      <div className="text-lg py-3 flex justify-center items-center">
        <p className="text-[#222222]/50 font-light">
          Already have an account?&nbsp;
        </p>
        <Link className="text-secondary-100" href="/auth/login">
          Log In
        </Link>
      </div>
    </form>
  );
};
