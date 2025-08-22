import Image from "next/image";
import { SignUpForm } from "./_components/create-account-form";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="relative flex flex-col lg:flex-row items-center min-h-screen">
      {/* Mobile and Tablet background image */}
      <div className="absolute inset-0 lg:hidden bg-secondary-100">
        <Image
          alt=""
          src={"/images/design.png"}
          fill={true}
          sizes="(max-width: 1023px) 100vw, 0vw"
          priority
          quality={100}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>

      {/* Form section */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center min-h-screen bg-black/50 lg:bg-white">
        <Link href={"/"}>
          <Image
            alt="logo"
            src="/images/logo.png"
            width={93}
            height={46}
            className=" hidden lg:block w-auto h-12 sm:h-12 md:h-14 2xl:h-16 absolute top-5 left-12 xl:left-40"
          />
        </Link>
        <div className="w-full max-w-md mx-4 p-4 xl:max-w-full xl:mx-36 bg-white py-12 rounded-xl border-none">
          <h1 className="text-2xl lg:text-3xl text-primary-100 font-semibold my-9">
            Create Account
          </h1>

          <SignUpForm />
        </div>
      </div>

      {/* Desktop image section */}
      <div className="hidden lg:block relative w-1/2 h-screen bg-secondary-100">
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

        <div className="absolute inset-0 z-20 py-8 px-5 lg:p-10 xl:p-24 flex flex-col items-start justify-center">
          <p className="text-white font-bold text-[44px] 2xl:text-6xl leading-[60px] 2xl:leading-[80px] mb-7">
            Begin managing your bakery seamlessly.
          </p>

          <p className="text-white text-base 2xl:text-xl font-normal leading-6 2xl:leading-7 w-[431px] 2xl:w-[550px]">
            Get all you need to take your bakery to the next level with Bakery
            Management, created by bakers just like you, with a clear
            understanding of all you need to effectively manage your bakery.
          </p>
        </div>
      </div>
    </div>
  );
}
