"use client";

import clsx from "clsx";
import { NavItem } from "@/interface/global";
import Link from "next/link";

type NavBarItemProps = {
  item: NavItem;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  onClick: Function;
};

export const NavBarItem = ({ item, onClick }: NavBarItemProps) => {
  return (
    <li className={clsx("relative")}>
      <Link
        href={item.href}
        onClick={() => onClick()}
        className={clsx(
          "w-full flex items-center rounded-lg lg:py-4 lg:px-6 duration-300 ease-in-out focus:outline-none text-background lg:text-primary-200 whitespace-nowrap"
        )}
      >
        <span className="text-base font-regular">{item.name}</span>
      </Link>
    </li>
  );
};
