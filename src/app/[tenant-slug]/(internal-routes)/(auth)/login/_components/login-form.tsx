"use client";

import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { MaskPasswordInput } from "@/components/mask-password-input";
// import { MaskPasswordInput } from "components/mask-password-input";
// import { Select } from "components/select";
import Link from "next/link";
// import { useSignUp } from "hooks";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { signUpValidationSchema } from "validations";
// import { InferType } from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

export const LoginForm = () => {
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
        label={"Email Address"}
        id="officialEmail"
        type="email"
        placeholder="Enter Company Email"
      />

      <MaskPasswordInput
        label="Create your password"
        placeholder="Enter Password"
        //   error={errors?.password}
        //   {...register("password", { required: true })}
      />

      <div className="pt-8">
        <LinkButton
          href="/create-account/password"
          variant="primary"
          className="w-full cursor-pointer text-[20px] font-bold whitespace-nowrap"
          //   isLoading={isSubmitting}
        >
          Log in
        </LinkButton>
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
