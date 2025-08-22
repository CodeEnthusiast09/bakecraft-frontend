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

export const SignUpForm = () => {
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
      <Input
        label="Full Name"
        type="text"
        placeholder="First name and last name"
        // error={errors?.firstName}
        // {...register("firstName", { required: true })}
      />
      <Input
        label="Email"
        type="text"
        placeholder="you@example.com"
        // error={errors?.lastName}
        // {...register("lastName", { required: true })}
      />
      <Input
        label="Phone Number"
        type="text"
        placeholder="Enter phone number"
        // error={errors?.email}
        // {...register("email", { required: true })}
      />

      <div className="relative">
        {/* <MaskPasswordInput
          label="Password"
          placeholder="Enter Password"
          error={errors?.password}
          {...register("password", { required: true })}
        /> */}
      </div>
      <div className="pt-8">
        <LinkButton
          href="/"
          variant="primary"
          className="w-full cursor-pointer text-[20px] font-bold whitespace-nowrap"
          //   isLoading={isSubmitting}
        >
          Continue
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
