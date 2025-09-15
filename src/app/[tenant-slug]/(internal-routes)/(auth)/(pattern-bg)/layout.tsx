import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="px-wrapper md:px-wrapper-md lg:px-wrapper-lg xl:px-wrapper-xl 4xl:px-wrapper-4xl bg-primary-300 drop-shadow-lg py-4">
        <Link href="/">
          <Image
            src="/images/logo-white.png"
            alt="Logo"
            height={40}
            width={120}
            className="h-16 w-auto"
          />
        </Link>
      </div>
      <div className="bg-auth-bg-pattern bg-no-repeat bg-cover bg-center bg-secondary-100 min-h-screen  px-wrapper md:px-wrapper-md lg:px-wrapper-lg xl:px-wrapper-xl 4xl:px-wrapper-4xl">
        <main className="min-h-[70vh] flex items-center justify-center w-full pt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
