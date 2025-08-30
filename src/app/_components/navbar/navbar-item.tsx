"use client";

import clsx from "clsx";
import { NavItem } from "@/interfaces/global";
import Link from "next/link";
import { useTenantPath } from "@/hooks/common/useTenantPath";

type NavBarItemProps = {
  item: NavItem;
  onClick: Function;
};

export const NavBarItem = ({ item, onClick }: NavBarItemProps) => {
  const href = useTenantPath(item.href, { tenantScoped: item.tenantScoped });

  return (
    <li className={clsx("relative")}>
      <Link
        href={href}
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
