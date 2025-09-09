"use client";
import { useState, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
import { Skeleton } from "@/components/skeleton";
import { useEscapeKeyListener, useOnClickOutside } from "@/hooks/common";
import { FiLogOut } from "react-icons/fi";
import { LinkButton } from "@/components/link-button";
import { useAccount } from "@/hooks/services/account";
import { Button } from "@/components/button";
import { useLogout } from "@/hooks/services";
import Image from "next/image";
import { NotificationModal } from "./notification-modal";
import { ExpandableSearch } from "@/components/search-box/expandable-search-box";
// import { ChangePassword } from "./change-password-modal";

export const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: userDetails } = useAccount();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setShowDropdown(false));
  useEscapeKeyListener(() => setShowDropdown(false));

  const handleDropdown = () => {
    setShowDropdown((prev: boolean) => !prev);
  };

  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  return (
    <header className="print:hidden">
      <nav className="bg-secondary-300 px-5 lg:px-10 border-b border-b-[#E4E4E7] py-2 lg:py-4">
        <div className={`flex justify-end items-center lg:py-1`}>
          <div className="flex items-center">
            {/* user icon that has a dropdown menu of logout */}
            <div className="relative flex items-center gap-7" ref={dropdownRef}>
              <div className="hidden h-[56px] pr-8 md:flex items-center border-r-2 border-primary-100">
                <ExpandableSearch
                  trigerButtonClass="border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 bg-transparent hover:bg-transparent"
                  triggerButtonVariant="transparent"
                />

                <NotificationModal />
              </div>
              <button
                className="flex items-center gap-x-1 xl:gap-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2"
                onClick={handleDropdown}
                aria-haspopup="menu"
                aria-expanded={showDropdown ? "true" : "false"}
                disabled={!userDetails}
              >
                {/* user picture or icon in round shape */}
                {userDetails?.image ? (
                  <Image
                    src={userDetails?.image}
                    alt={`${userDetails?.firstName} ${userDetails?.lastName}`}
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                ) : (
                  <div className="border-2 border-primary-100 rounded-full">
                    <div className="flex items-center justify-center h-7 w-7 rounded-full m-1 bg-primary-100">
                      <FaUser className="h-4 w-4 text-background" />
                    </div>
                  </div>
                )}

                {userDetails ? (
                  <div className="flex gap-x-2 items-center font-medium">
                    <span className="text-sm">
                      {userDetails?.firstName}{" "}
                      <span className="hidden md:inline">
                        {userDetails?.lastName}
                      </span>
                    </span>
                    <SlArrowDown className="text-sm" />
                  </div>
                ) : (
                  <div>
                    <Skeleton height={3} className="rounded-md w-16 md:w-36" />
                    <Skeleton
                      height={30}
                      className="rounded-md w-12 md:w-20 mt-1"
                    />
                  </div>
                )}
              </button>
              {showDropdown && (
                <div className="z-40 absolute top-14 -right-3 md:right-0 w-48 mt-2 origin-top-right bg-white  border border-gray-200 divide-gray-100 rounded-md shadow-lg outline-none divide-y">
                  <div className="">
                    {/* <LinkButton
                      href="/profile/bio-data"
                      variant="transparent"
                      justifyContent="justify-start"
                      className="block w-full md:h-12  text-xs  hover:bg-gray-100 border-transparent"
                    >
                      <CiUser className="mr-2" />
                      View profile
                    </LinkButton> */}
                  </div>

                  {/* <div className="">
                    <ChangePassword />
                  </div> */}

                  <div className="">
                    <Button
                      onClick={logout}
                      isLoading={isLoggingOut}
                      variant="transparent"
                      justifyContent="justify-start"
                      className="block w-full md:h-12 text-xs text-red-500 hover:bg-gray-100 border-transparent"
                    >
                      <FiLogOut className="mr-2" />
                      Log out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
