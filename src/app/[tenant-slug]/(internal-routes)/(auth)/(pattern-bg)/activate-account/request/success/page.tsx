import { Card } from "components/card";
import { RiLockPasswordLine } from "react-icons/ri";
import { ResendEmailButton } from "./_components/resend-button";

export default function Page() {
  return (
    <Card className="md:w-2/3 lg:w-2/4 xl:w-1/4 mx-auto rounded-2xl px-9 py-12">
      <div className="bg-secondary-100 flex items-center justify-center rounded-full h-20 w-20 mx-auto mb-10">
        <RiLockPasswordLine className="text-3xl text-secondary-500" />
      </div>
      <h1 className="text-xl text-primary-500 font-semibold text-center ">
        We&apos;ve sent you an e-mail
      </h1>
      <div className="text-sm text-neutral-500 text-center mt-3 mb-10">
        We have sent you a new activation link
      </div>

      <div className="mt-10 flex items-center text-sm justify-center">
        <span>Didn&apos;t get the mail?</span>
        <ResendEmailButton />
      </div>
    </Card>
  );
}
