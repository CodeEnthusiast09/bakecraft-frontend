import Image from "next/image";
import Steps from "./_components/steps";

const HowToSection = () => {
  return (
    <div className="mt-16 md:grid md:grid-rows-2 xl:grid-rows-1 xl:grid-cols-2 md:items-center md:place-items-center mx-5 lg:mx-20 2xl:mx-72">
      <div className="hidden md:block relative w-[500px]">
        <Image
          alt="picture of a woman in a bakery"
          src={"/images/bakery-profile.jpg"}
          width={460}
          height={570}
          priority
          className="transform scale-x-[-1] w-[460px] h-[570px] rounded-[20px] object-cover object-[75%_70%]"
        />

        <div className="absolute top-16 left-12 lg:left-9 -z-1">
          <Image
            alt="vector"
            src={"/images/design.png"}
            width={460}
            height={570}
            priority
            className="transform scale-x-[-1] w-[460px] h-[570px] rounded-[20px] object-cover object-[75%_70%] bg-secondary-100"
          />
        </div>
      </div>

      <div className="md:pt-[70px] xl:pt-[110px] xl:w-[550px]">
        <h2 className="text-primary-300 min-[320px]:text-[27px] min-[375px]:text-3xl min-[425px]:text-4xl lg:text-[44px] font-bold mb-5 text-center xl:text-left leading-[1.3] align-middle">
          Getting started with Bakery management is as easy as these few steps
        </h2>

        <p className="text-primary-500 text-xl font-light text-center xl:text-left mt-2.5 mb-10 xl:w-[462px]">
          Give your business the gift of a cloud based bakery management system,
          save energy and time. Go digital, maximizing output. Integrate Bakery
          Management easily with these steps:
        </p>

        <div className="flex flex-col items-center justify-center gap-5 md:gap-8 lg:gap-16 2xl:gap-28 md:flex-row md:flex-wrap xl:block">
          <Steps
            image="/images/create-account.svg"
            title="Create Account"
            description="Conveniently create your account and proceed with our user-friendly onboarding process for you and your team."
          />

          <Steps
            image="/images/upload.svg"
            title="Import or provide bakery data"
            description="You can import your already existing bakery data easily or fill our inbuilt forms to set up your custom bakery management. "
          />

          <Steps
            image="/images/done.svg"
            title="You're all set"
            description="Proceed to enjoy real-time access of your bakery operations, with continuous updates of processes being as easy as few clicks and input. "
          />
        </div>
      </div>
    </div>
  );
};

export default HowToSection;
