"use client";

import Image from "next/image";
import PlanCard from "@/components/plan-card";
import { usePlans } from "@/hooks/services/plan";

const PlansSection = () => {
  const { data: plans, isPending } = usePlans();

  return (
    <div className="relative mt-10 xl:mt-[72px]">
      <Image
        alt="vector"
        src={"/images/design.png"}
        width={460}
        height={326}
        priority
        className="transform scale-x-[-1] w-full h-[1900px] md:h-[1050px] xl:h-[380px] 2xl:h-[405px] object-cover object-[75%_70%] bg-primary-100"
      />

      <div className="absolute inset-0 z-20 py-8 px-5 lg:p-10 xl:p-24">
        <p className="text-white min-[320px]:text-3xl min-[375px]:text-4xl lg:text-[40px] 2xl:text-5xl text-center mb-5 leading-[1.3]">
          We’ve got
          <span className="font-bold"> Flexible Plans</span> for everyone!
        </p>

        <p className="text-white text-xl 2xl:text-3xl font-light text-center mt-2.5">
          Choose a plan that works best for you
          <br className="hidden md:block" /> and your team.
        </p>

        <div>
          <PlanCard data={plans ?? []} isLoading={isPending} page="home" />
        </div>
      </div>
    </div>
  );
};

export default PlansSection;
