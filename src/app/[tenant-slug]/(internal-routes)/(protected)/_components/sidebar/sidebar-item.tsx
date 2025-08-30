"use client";
import { useTenantPath } from "@/hooks/common/useTenantPath";
import { SidebarItem } from "@/interfaces";
import clsx from "clsx";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarItemProps = {
  item: SidebarItem;
  leftDecorator?: boolean;
  onClick: Function;
};

export const NavbarItem = ({
  item,
  leftDecorator = true,
  onClick,
}: SidebarItemProps) => {
  const pathname = usePathname();

  const href = useTenantPath(item.href, { tenantScoped: item.tenantScoped });

  return (
    <li>
      <Link
        href={href}
        onClick={() => onClick()}
        className={clsx(
          "w-full bg-primary-300/70 flex items-center duration-500 ease-in-out focus:outline-primary-500 px-6",
          leftDecorator ? "w-[86.7%]" : "ml-[2px]",
          pathname.includes(item?.href)
            ? "text-background font-bold"
            : "hover:bg-primary-300/70 text-background"
        )}
      >
        <div className="py-6 px-4 flex items-center">
          <span className="mr-3">
            {pathname.includes(item.href)
              ? item.icon.active
              : item.icon.default}
          </span>
          <span className="text-base">{item.name}</span>
        </div>
      </Link>
    </li>
  );

  return null;
};
