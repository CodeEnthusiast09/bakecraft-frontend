import Image from "next/image";
import { PlanCardProps } from "./types";
import { koboToNaira } from "@/lib/utils";
import { Skeleton } from "@/components/skeleton";
import { useInitiateSubscription } from "@/hooks/services";
import { Button } from "../button";
import { retrieveFromLocalStorage } from "@/lib/localStorage";
import { Tenant } from "@/interfaces";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const PlanCard = ({
  data,
  isLoading = false,
  page = "home",
}: PlanCardProps) => {
  const { mutate, isPending: isSubmitting } = useInitiateSubscription();

  const router = useRouter();

  const handleSubscribe = (planCode: string) => {
    const tenant: Tenant = retrieveFromLocalStorage("tenant");

    if (!tenant?.slug || !tenant?.companyEmail) {
      console.error("Tenant data missing in localStorage", tenant);

      toast.error("Please complete your company details first.");

      router.push("/create-account/company-details");

      return;
    }

    mutate({
      data: {
        tenantSlug: tenant.slug,
        planCode,
        email: tenant.companyEmail,
      },
    });
  };

  if (!data || data.length === 0) {
    return isLoading ? (
      <div className="mt-14 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-background w-[250px] shrink-0 h-[360px] py-10 px-7 shadow-xl rounded-[20px] flex flex-col items-center justify-between snap-start"
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
    <div className="mt-14 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {data.map((plan) => (
        <div
          key={plan.planCode}
          className="bg-background w-[250px] shrink-0 h-[360px] min-[320px]:py-10 min-[320px]:px-7 min-[375px]:py-10 min-[375px]:px-7 md:py-10 md:px-7 shadow-xl rounded-[20px] flex flex-col items-center justify-between snap-start"
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

          {page === "subscription" ? (
            <Button
              onClick={() => handleSubscribe(plan.planCode)}
              isLoading={isSubmitting}
              variant="primary"
              className="text-[17px] cursor-pointer whitespace-nowrap"
            >
              Get {plan.name}
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/create-account")}
              variant="primary"
              className="text-[17px] cursor-pointer whitespace-nowrap"
            >
              Start Your Journey
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlanCard;
