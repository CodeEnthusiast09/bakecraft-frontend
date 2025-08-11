import { LinkButton } from "@/components/link-button";

const ImploreSection = () => {
  return (
    <div className="relative mt-10 xl:mt-[367px]">
      <div className="flex flex-col items-center">
        <p className="text-foreground font-bold min-[320px]:text-3xl min-[375px]:text-4xl lg:text-[44px] 2xl:text-5xl text-center mb-5 leading-[1.3]">
          Take your bakery to the next <br className="hidden md:block" /> level
          now.
        </p>

        <p className="text-foreground text-xl 2xl:text-3xl font-light text-center mb-8">
          Try Bakery Management today!
        </p>

        <LinkButton
          variant="primary"
          size="lg"
          href={"/create-account"}
          className="text-[15px] h-12 cursor-pointer whitespace-nowrap"
        >
          Create Account
        </LinkButton>
      </div>
    </div>
  );
};

export default ImploreSection;
