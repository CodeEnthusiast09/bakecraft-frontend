import { LinkButton } from "@/components/link-button";
import Image from "next/image";
import Link from "next/link";

const SubscriptionSuccess = () => {
  return (
    <div className="overflow-hidden h-screen">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <Link href={"/"}>
          <Image
            alt="logo"
            src="/images/logo.png"
            width={93}
            height={46}
            className="w-auto h-10 sm:h-12 md:h-14 2xl:h-16"
          />
        </Link>

        <p className="text-primary-200 text-sm sm:text-base md:text-lg lg:text-xl font-normal">
          FAQs
        </p>
      </div>

      <div className="bg-secondary-300 w-screen h-screen flex flex-col items-center justify-center p-2.5">
        <Image
          alt="success image"
          src={"/images/checklist-done.svg"}
          width={410}
          height={365}
        />

        <p className="font-bold text-2xl md:text-[44px] mb-7">Good job!</p>

        <p className="font-normal text-base text-primary-500 text-center mb-7">
          You are right on track to transforming your bakery with Bakery
          <br className="hidden md:block" />
          &nbsp; Management, with all the information you have provided.
        </p>

        <LinkButton href="/" size="md" className="text-xl font-medium w-64">
          Log in to your profile
        </LinkButton>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
