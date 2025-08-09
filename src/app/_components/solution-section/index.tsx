import SolutionCard from "@/components/solution-card";

const SolutionSection = () => {
  return (
    <div className="mt-10 xl:mt-[72px]">
      <h2 className="min-[320px]:text-[27px] min-[375px]:text-3xl min-[425px]:text-4xl lg:text-[44px] xl:text-6xl text-center font-bold mb-10 xl:mb-[72px]">
        Your <span className="text-secondary-100">all-in-one</span> bakery
        solution
      </h2>

      <div className="flex flex-col items-center justify-center gap-16 2xl:gap-28 lg:flex-row lg:flex-wrap xl:flex-row">
        <SolutionCard
          image="/images/real-time.svg"
          title="Real time reports & analytics"
          description="Get real-time access to bakery information across all modules which include production,sales & inventory, and accounting, with a custom dashboard highlighting key performance indicators."
        />

        <SolutionCard
          image="/images/clock.svg"
          title="Increased productivity"
          description="Eliminate manual operation processes, saving valuable time with transparent records of all bakery processes made available for referral, allowing focus on other business operations."
        />

        <SolutionCard
          image="/images/integration.svg"
          title="Seamless integration"
          description="Easily integrate Bakery Management into your existing operational model, with just a few onboarding processes. It’s user friendly and allows for better collaboration among staff."
        />
      </div>
    </div>
  );
};

export default SolutionSection;
