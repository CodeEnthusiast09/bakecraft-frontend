import Image from "next/image";
import PlanCard from "./_components/plan-card";

const PlansSection = () => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-full h-[190vh] md:h-[110vh] xl:h-[50vh] bg-secondary-100">
        <Image
          alt=""
          src={"/images/design.png"}
          fill={true}
          sizes="(min-width: 1024px) 50vw, 0vw"
          priority
          quality={100}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        <div className="absolute w-full flex items-center justify-between px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div>
            <Image
              alt="logo"
              src="/images/logo.png"
              width={93}
              height={46}
              className="w-auto h-10 sm:h-12 md:h-14 2xl:h-16"
            />
          </div>

          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-normal">
            FAQs
          </p>
        </div>

        <div className="absolute inset-0 z-20 py-20 px-5 lg:pt-[110px] xl:pt-[300px] 2xl:pt-[230px]">
          <p className="text-white min-[320px]:text-3xl min-[375px]:text-4xl lg:text-[40px] 2xl:text-5xl text-center mb-5 leading-[1.3] font-bold">
            Flexible Plans
          </p>

          <p className="text-white text-xl 2xl:text-3xl font-light text-center mt-2.5">
            Choose a plan that works best for you
            <br className="hidden md:block" /> and your team.
          </p>

          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-items-center">
            <PlanCard
              name="1-month plan"
              description="Perfect for teams that prefer monthly subscriptions. Unlimited access!"
              amount={25000}
              interval="monthly"
            />

            <PlanCard
              name="1-month plan"
              description="Perfect for teams that prefer monthly subscriptions. Unlimited access!"
              amount={25000}
              interval="monthly"
            />

            <PlanCard
              name="1-month plan"
              description="Perfect for teams that prefer monthly subscriptions. Unlimited access!"
              amount={25000}
              interval="monthly"
            />

            <PlanCard
              name="1-month plan"
              description="Perfect for teams that prefer monthly subscriptions. Unlimited access!"
              amount={25000}
              interval="monthly"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansSection;
