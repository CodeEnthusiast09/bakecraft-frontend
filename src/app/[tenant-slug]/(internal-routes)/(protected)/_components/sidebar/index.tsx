"use client";
import { Button } from "@/components/button";
import Image from "next/image";
import { useState } from "react";
import { FaBars, FaHome, FaTimes } from "react-icons/fa";
import { TfiHome } from "react-icons/tfi";
import { sideBarModules } from "@/lib/sidebar-data";
import { NavbarModule } from "./sidebar-module";
import { NavbarItem } from "./sidebar-item";
import Link from "next/link";
import { useSearchSidebarFilter } from "@/hooks/common";

export const Sidebar = () => {
  const [showNav, setShowNav] = useState(false);

  const { filteredNavGroups } = useSearchSidebarFilter(sideBarModules);

  const toggleNav = () => {
    setShowNav((prev) => !prev);
  };

  return (
    <aside className="w-full lg:w-[22vw] 2xl:w-[18vw] lg:h-screen relative xl:overflow-auto bg-secondary-100 print:hidden ">
      {/* Mobile devices */}
      <div className="flex items-center gap-4 absolute left-0 top-2 z-20 lg:hidden lg:py-3 px-3">
        <Button
          type="button"
          onClick={toggleNav}
          className="bg-transparent hover:bg-transparent"
        >
          <FaBars className="text-secondary-100 text-3xl" />
        </Button>
        <div className="px-2 py-1">
          <Image
            src="/images/logo-white.png"
            alt="Logo"
            priority={true}
            loading="eager"
            className="w-24 h-8"
            width={100}
            height={35}
          />
        </div>
      </div>

      <div
        className={`px-0 pt-6 pb-20  lg:pb-6 h-screen w-full overflow-auto md:w-[40vw] lg:w-[22vw] 2xl:w-[18vw] bg-secondary-100 z-50 border-r border-r-[#E4E4E7] fixed lg:left-0 transition-all duration-500 top-0 ${
          showNav ? "left-0" : " -left-[150vw]"
        }  lg:block`}
      >
        <div
          className={`flex items-center justify-between ${
            showNav ? "lg:justify-center" : "lg:justify-start"
          }`}
        >
          <div className="py-1 lg:w-full focus:outline-primary-500">
            <Image
              src="/images/logo-white.png"
              alt="Logo"
              priority={true}
              loading="eager"
              className="h-16 w-auto pl-9"
              width={150}
              height={45}
            />
          </div>

          <Button
            onClick={toggleNav}
            className="bg-transparent hover:bg-transparent lg:hidden"
          >
            <FaTimes className="text-red-500 text-2xl" />
          </Button>
        </div>

        <nav className="pt-10 block min-h-scree z-50">
          <ul className="flex flex-col pb-36">
            {/* Map through the filtered sideBarModules */}
            {filteredNavGroups?.map((sideBarModules, index) => (
              <NavbarModule
                key={index}
                module={sideBarModules}
                onClick={() => toggleNav()}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
