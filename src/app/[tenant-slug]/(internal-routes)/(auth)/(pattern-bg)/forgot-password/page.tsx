import { Card } from "components/card";
import { Form } from "./_components/form";
import { RiLockPasswordLine } from "react-icons/ri";
import { LinkButton } from "components/link-button";

export default function Page() {
  return (
    <Card className="md:w-2/3 lg:w-2/4 xl:w-1/4 mx-auto rounded-2xl px-9 py-12">
      <div className="bg-secondary-100 flex items-center justify-center rounded-full h-20 w-20 mx-auto mb-10">
        <RiLockPasswordLine className="text-3xl text-secondary-500" />
      </div>
      <h1 className="text-2xl lg:text-3xl text-primary-500 font-semibold text-center ">
        Forgot Password
      </h1>
      <div className="text-sm text-neutral-500 text-center mt-3 mb-10">
        Please enter the email address that is associated with your account in
        order to reset your password.
      </div>

      <Form />

      <div className="mt-10">
        <LinkButton
          href="/"
          variant="transparent"
          className="border-none underline text-primary-500 font-medium"
        >
          Back to login
        </LinkButton>
      </div>
    </Card>
  );
}
