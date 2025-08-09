"use client";

import { Button } from "@/components/button";
import { useState } from "react";
import { RiMenu4Line } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import { navItems } from "./navbar.data";
import { NavItem } from "@/interface/global";
import { NavBarItem } from "./navbar-item";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LinkButton } from "@/components/link-button";

export const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav((prev: boolean) => !prev);
  };

  return (
    <header className="bg-background w-full h-[72px] flex items-center justify-between lg:px-[50px] xl:px-[165px]">
      <div className="flex items-center gap-2 px-4 py-4">
        <Image
          alt="logo"
          src="/images/logo.png"
          width={93}
          height={46}
          className="w-auto h-12 sm:h-12 md:h-12"
        />
      </div>
      {/* Mobile devices */}
      <div className="flex items-center gap-4 lg:hidden">
        {/* <Button variant="mobile-nav" onClick={toggleNav}>
          <RiMenu4Line className="text-3xl text-primary-100" />
        </Button> */}
        <Button variant="mobile-nav" onClick={toggleNav}>
          <AnimatePresence mode="wait" initial={false}>
            {showNav ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaTimes className="text-3xl text-background" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <RiMenu4Line className="text-3xl text-primary-100" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {/* Desktop Navbar */}
      <nav className="hidden lg:flex items-center">
        <ul className="flex items-center gap-12">
          {navItems.map((item: NavItem, index: number) => (
            <NavBarItem key={index} item={item} onClick={() => toggleNav()} />
          ))}

          <div className="hidden lg:flex items-center gap-5 px-4 py-3">
            <LinkButton
              variant="primary"
              size="lg"
              href={"/create-account"}
              className="hidden text-[15px] md:block cursor-pointer whitespace-nowrap"
            >
              Create Account
            </LinkButton>
          </div>
        </ul>
      </nav>

      {/* Mobile Navbar */}
      <div
        className={`px-5 xl:px-6 py-6 h-screen overflow-auto w-1/2 md:w-[40vw] lg:w-[25vw] 2xl:w-[18vw] bg-primary-100 border-l border-l-primary-200 z-50 fixed lg:right-0 transition-all duration-500 top-0 ${
          showNav ? "right-0" : " -right-[150vw]"
        } lg:hidden`}
      >
        <div className="flex items-center justify-between pb-6">
          {/* <Button
            onClick={toggleNav}
            variant="mobile-nav"
            className="bg-transparent hover:bg-transparent"
          >
            <FaTimes className="text-background text-2xl absolute right-4" />
          </Button> */}
          <Button variant="mobile-nav" onClick={toggleNav}>
            <AnimatePresence mode="wait" initial={false}>
              {showNav ? (
                <motion.div
                  key="close"
                  className="absolute right-4 top-[23px]"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes className="text-3xl text-background " />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <RiMenu4Line className="text-3xl text-primary-100" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
        <nav className="block z-50">
          <ul className="flex flex-col gap-8">
            {navItems.map((item: NavItem, index: number) => (
              <NavBarItem key={index} item={item} onClick={() => toggleNav()} />
            ))}

            <hr className="h-[1px] bg-secondary-100" />

            <div className="flex flex-col items-start gap-5">
              <LinkButton
                href="/create-account"
                variant="secondary"
                className="w-full text-[13.5px] md:text-[15px] rounded-2xl block md:block py-3"
              >
                Create Account
              </LinkButton>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};
