import Image from "next/image";
import { PlanCardProps } from "./types";
import { LinkButton } from "@/components/link-button";
import { koboToNaira } from "@/lib/utils";
import { Skeleton } from "@/components/skeleton";

const PlanCard = ({ data, isLoading = false }: PlanCardProps) => {
  if (!data || data.length === 0) {
    return isLoading ? (
      <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-items-center">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-background w-[250px] h-[360px] py-10 px-7 shadow-xl rounded-[20px] flex flex-col items-center justify-between"
          >
            <Skeleton height={24} width={120} className="rounded-md" />
            <Skeleton height={40} width={180} className="rounded-md" />
            <Skeleton height={30} width={80} className="rounded-md" />
            <Skeleton height={20} width={100} className="rounded-md" />
            <Skeleton height={20} width={160} className="rounded-md" />
            <Skeleton height={40} width={140} className="rounded-md" />
          </div>
        ))}
      </div>
    ) : null;
  }

  return (
    <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-items-center">
      {data.map((plan) => (
        <div
          key={plan.planCode}
          className="bg-background w-[250px] h-[360px] min-[320px]:py-10 min-[320px]:px-7 min-[375px]:py-10 min-[375px]:px-7 md:py-10 md:px-7 shadow-xl rounded-[20px] flex flex-col items-center justify-between"
        >
          <p className="font-bold text-xl text-primary-300">{plan.name}</p>

          <p className="text-primary-500 font-light text-xs text-center">
            {plan.description}
          </p>

          <p className="font-bold text-2xl text-primary-300">
            ₦{koboToNaira(plan.amount)}
          </p>

          <p className="text-primary-500 font-light text-xs">
            Billed {plan.interval}
          </p>

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
            href="/create-account/subscription-success"
            variant="primary"
            className="text-[17px] py-2.5 cursor-pointer whitespace-nowrap"
          >
            Get {plan.name}
          </LinkButton>
        </div>
      ))}
    </div>
  );
};

export default PlanCard;
