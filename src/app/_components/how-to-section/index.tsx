import Image from "next/image";
import Steps from "./_components";

const HowToSection = () => {
  return (
    <div className="mt-10 xl:mt-[72px] mx-5 lg:mx-40 flex items-center justify-center gap-20">
      <div className="relative">
        <Image
          alt="picture of a woman in a bakery"
          src={"/images/bakery-profile.jpg"}
          width={460}
          height={570}
          priority
          className="transform scale-x-[-1] w-[460px] h-[570px] rounded-[20px] object-cover object-[75%_70%]"
        />

        <div className="absolute top-20 left-12 lg:left-8 -z-1">
          <Image
            alt="picture of a woman in a bakery"
            src={"/images/design.png"}
            width={460}
            height={570}
            priority
            className="transform scale-x-[-1] w-[460px] h-[570px] rounded-[20px] object-cover object-[75%_70%] bg-secondary-100"
          />
        </div>
      </div>

      <div className="w-[636px]">
        <h2 className="text-primary-300 min-[320px]:text-[27px] min-[375px]:text-3xl min-[425px]:text-4xl lg:text-[44px] text-left font-bold mb-5 leading-[1.3]">
          Getting started with <br />
          Bakery management is as easy as these few steps
        </h2>

        <p className="text-primary-500 text-xl 2xl:text-3xl font-light text-left md:text-left mt-2.5 mb-10 w-[462px]">
          Give your business the gift of a cloud based bakery management system,
          save energy and time. Go digital, maximizing output. Integrate Bakery
          Management easily with these steps:
        </p>

        <div>
          <Steps />
        </div>
      </div>
    </div>
  );
};

export default HowToSection;
