import { DashboardCardProps } from "./types";
import { FaUsers } from "react-icons/fa";
import { InventoryIcon } from "../../../../../../../public/images/inventory";
import { AccountsIcon } from "../../../../../../../public/images/accounts";
import { FaArrowsRotate } from "react-icons/fa6";
import Link from "next/link";
import { useTenantPath } from "@/hooks/common/useTenantPath";

const dashboardCards: DashboardCardProps[] = [
  {
    icon: FaUsers,
    title: "Invite Team",
    description:
      "Invite your bakery team members, assign roles and grant user privileges",
    href: "/teams",
    tenantScoped: true,
  },
  {
    icon: InventoryIcon,
    title: "Setup Inventory",
    description:
      "Record items currently in stock and usage of each, to enable notification when products reach limit-cap.",
    href: "/inventory",
    tenantScoped: true,
  },
  {
    icon: FaArrowsRotate,
    title: "Setup Production",
    description:
      "Define your bakery recipes, to allow account of all bakery products.",
    href: "/production",
    tenantScoped: true,
  },
  {
    icon: FaUsers,
    title: "Create Customers",
    description:
      "Import existing customer records or simply create customers to record sales and invoices.",
    href: "/customers",
    tenantScoped: true,
  },
  {
    icon: AccountsIcon,
    title: "Setup Accounting",
    description:
      "Set up your accounting module to capture all accounting aspects of your bakery management.",
    href: "/accounts",
    tenantScoped: true,
  },
];

const DashboardCardItem = ({
  icon: Icon,
  title,
  description,
  href,
  tenantScoped,
}: DashboardCardProps) => {
  const tenantHref = useTenantPath(href, { tenantScoped });

  return (
    <Link href={tenantHref}>
      <div className="p-4 h-64 2xl:h-80 bg-background rounded-lg flex flex-col items-center justify-center gap-8 hover:bg-primary-100 hover:shadow-md transition group cursor-pointer">
        {Icon && (
          <div className="text-[#1e3653] group-hover:text-white transition-colors">
            <Icon color="currentColor" size={54} opacity={1} />
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold text-center mb-3.5 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="font-light text-base 2xl:text-lg text-primary-500 text-center group-hover:text-white transition-colors">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

const DashboardCard = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {dashboardCards.map((card, i) => (
        <DashboardCardItem key={i} {...card} />
      ))}
    </div>
  );
};

export default DashboardCard;
