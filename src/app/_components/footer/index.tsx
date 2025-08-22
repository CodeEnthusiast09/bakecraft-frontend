import Image from "next/image";

const Footer = () => {
  return (
    <div className="relative mt-10 xl:mt-[72px] h-[550px] md:h-[339px] bg-secondary-100">
      <Image
        alt="vector"
        src={"/images/design.png"}
        width={460}
        height={326}
        priority
        className="transform scale-x-[-1] w-full h-[550px] md:h-[339px] object-cover"
      />

      <div className="absolute inset-0 z-20 py-8 px-5 lg:p-10 xl:p-24 grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-items-center">
        <Image
          alt="logo"
          src="/images/logo.png"
          width={203}
          height={101.76}
          priority
        />

        <p className="text-white text-base text-center">
          42 Croissant Lane Butterville, CA 90210 USA
        </p>

        <p className="text-white text-base">contact@buttervillebakery.com</p>

        <p className="text-white text-base">
          +234-818-838-0199 <br /> +234-818-838-0201 <br /> +234-803-474-0253
        </p>
      </div>
    </div>
  );
};

export default Footer;
