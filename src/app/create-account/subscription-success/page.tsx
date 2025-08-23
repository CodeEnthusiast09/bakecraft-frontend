import { LinkButton } from "@/components/link-button";
import Image from "next/image";

const SubscriptionSuccess = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <Image
          alt="success image"
          src={"/images/success.svg"}
          width={410}
          height={365}
        />

        <p className="font-bold text-[44px] mb-7">Subscription Successful!</p>

        <p className="font-normal text-base text-primary-500 mb-7">
          Now you have access to all you need to take your bakery to the next
          level!
        </p>

        <LinkButton
          href="/create-account/company-details"
          className="text-xl font-medium w-64"
        >
          Continue
        </LinkButton>
      </div>
    </>
  );
};

export default SubscriptionSuccess;
