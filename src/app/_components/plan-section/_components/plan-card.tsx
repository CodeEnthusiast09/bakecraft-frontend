import Image from "next/image";
import { PlanCardProps } from "./types";
import { LinkButton } from "@/components/link-button";

const PlanCard = ({ name, description, amount, interval }: PlanCardProps) => {
  return (
    <>
      <div className="bg-background w-[250px] h-[360px] min-[320px]:py-10 min-[320px]:px-7 min-[375px]:py-10 min-[375px]:px-7 md:py-10 md:px-7 shadow-xl rounded-[20px] flex flex-col items-center justify-between">
        <p className="font-bold text-xl text-primary-300">{name}</p>

        <p className="text-primary-500 font-light text-xs text-center">
          {description}
        </p>

        <p className="font-bold text-2xl text-primary-300">₦{amount}</p>

        <p className="text-primary-500 font-light text-xs">Billed {interval}</p>

        <div className="flex items-center gap-2.5">
          <Image
            src={"/images/check.svg"}
            alt={"check mark"}
            width={9.8}
            height={9.8}
            className="object-cover"
          />

          <p className="text-primary-500 font-light text-xs">
            All product features
          </p>
        </div>

        <LinkButton
          href="/create-account"
          variant="primary"
          className="text-[17px] py-2.5 cursor-pointer whitespace-nowrap"
        >
          Get {name}
        </LinkButton>
      </div>
    </>
  );
};

export default PlanCard;
