import { LinkButton } from "@/components/link-button";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[550px] xl:h-[700px] 2xl:h-[800px] overflow-hidden">
      <Image
        src="/images/Bakery image.png"
        fill
        priority
        alt="Image of people in a bakery"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#9e7c60]/70 via-#9e7c60/30 to-transparent"></div>

      <div className="absolute lg:hidden inset-0 bg-black/30 z-10"></div>

      <div className="absolute inset-0 z-20 py-8 px-5 lg:p-10 xl:p-24 flex flex-col items-center justify-center md:items-start gap-10 md:ml-5 2xl:ml-[90px]">
        <div className="w-[300px] min-[375px]:w-[330px]">
          <p className="text-white min-[320px]:text-3xl min-[375px]:text-4xl lg:text-[44px] 2xl:text-6xl text-center md:text-left mb-5 md:w-[400px] lg:w-[450px] 2xl:w-[650px]">
            Take your bakery to the
            <span className="font-bold"> next level</span> today.
          </p>
          <p className="text-white text-xl 2xl:text-3xl font-light text-center md:text-left mt-2.5 md:w-[450px] lg:w-[550px] xl:w-[600px] 2xl:w-[850px]">
            Get all you need to take your bakery to the next level with Bakery
            Management, created by bakers just like you, with a clear
            understanding of all you need to effectively manage your bakery.
          </p>
        </div>
        <div>
          <LinkButton
            href="/create-account"
            variant="primary"
            className="text-[17px] py-2.5 cursor-pointer whitespace-nowrap"
          >
            Create Account
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
