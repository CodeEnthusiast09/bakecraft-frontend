import clsx from "clsx";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SidebarItem, SidebarModule } from "@/interfaces";
import { useTenantPath } from "@/hooks/common/useTenantPath";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";

const NavbarItem = dynamic(
  () => import("./sidebar-item").then((mod) => mod.NavbarItem),
  { ssr: false }
);

type Props = {
  module: SidebarModule;
  onClick: Function;
};

export const NavbarModule = ({ module, onClick }: Props) => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  const [activeChild, setActiveChild] = useState<boolean>(false);

  const pathname = usePathname();

  const href = useTenantPath(module.href || "", {
    tenantScoped: module.tenantScoped || false,
  });

  const isModuleActive = module?.href && pathname.includes(module.href);

  useEffect(() => {
    if (
      (module &&
        module.items &&
        module.items.filter((item) => item?.href === pathname)?.length > 0) ||
      (module &&
        module.items &&
        module.items.filter((item) => pathname.includes(item?.href as string))
          ?.length > 0)
    ) {
      setDropdown(true);
      setActiveChild(true);
    }
  }, [pathname, module]);

  if (module?.href) {
    return (
      <Link
        href={href}
        aria-label={module.name}
        onClick={() => onClick()}
        className={clsx(
          "w-full grid justify-start items-center duration-500 ease-in-out h-full focus:outline-primary-500",
          isModuleActive
            ? "bg-primary-300/50 border-l-primary-500 text-background font-bold grid-cols-[0.5rem_1fr]"
            : "text-background hover:bg-primary-300/50 hover:text-primary-500 grid-cols-1"
        )}
      >
        {isModuleActive && (
          <div
            className={clsx(
              "w-2 h-full ease-in-out duration-300 block",
              "bg-primary-500"
            )}
          ></div>
        )}
        <div
          className={clsx(
            "py-[25px] flex items-center",
            isModuleActive ? "px-8" : "px-9"
          )}
        >
          <span className="mr-2.5">
            {isModuleActive ? module.icon.active : module.icon.default}
          </span>
          <div className="text-base text-left">{module.name}</div>
        </div>
      </Link>
    );
  }

  if (module?.items) {
    return (
      <>
        <li>
          <button
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
            aria-label={module.name}
            className={clsx(
              "w-full grid  justify-start items-center duration-500 ease-in-out h-full focus:outline-primary-500",
              dropdown
                ? "bg-primary-300/50 border-l-primary-500 text-background font-bold"
                : "text-background hover:bg-primary-300/50 hover:text-primary-500",
              dropdown ? "grid-cols-[1.5rem_1fr]" : "grid-cols-1 px-3"
            )}
          >
            {dropdown && (
              <div
                className={clsx(
                  "w-2 h-full ease-in-out duration-300",
                  dropdown ? "bg-primary-500" : "bg-transparent"
                )}
              ></div>
            )}

            <div
              className={clsx(
                "py-[25px] flex items-center justify-between",
                dropdown ? "px-4" : "px-6"
              )}
            >
              <div className="flex items-center">
                <span className="mr-2.5">
                  {activeChild ? module.icon.active : module.icon.default}
                </span>
                <div className="text-base text-left">{module.name}</div>
              </div>

              <span className="ml-2">
                {dropdown ? (
                  <PiCaretUpBold size={24} />
                ) : (
                  <PiCaretDownBold size={24} />
                )}
              </span>
            </div>
          </button>

          {dropdown && (
            <ul>
              {module?.items?.map((item: SidebarItem, index: number) => (
                <NavbarItem onClick={() => onClick()} item={item} key={index} />
              ))}
            </ul>
          )}
        </li>
      </>
    );
  }

  return null;
};
