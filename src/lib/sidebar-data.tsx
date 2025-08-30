import { SidebarModule } from "@/interfaces";
import { FaChartPie, FaCog, FaTicketAlt, FaUsers } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { InventoryIcon } from "../../public/images/inventory";
import { AccountsIcon } from "../../public/images/accounts";
import { ReportsIcon } from "../../public/images/reports";
import { ApprovalsIcon } from "../../public/images/approvals";

export const sideBarModules: SidebarModule[] = [
  {
    name: "Dashboard",
    icon: {
      active: <FaChartPie size={24} />,
      default: <FaChartPie size={24} opacity={0.4} />,
    },
    href: "/dashboard",
    tenantScoped: true,
  },
  {
    name: "Production",
    icon: {
      active: <FaArrowsRotate size={24} />,
      default: <FaArrowsRotate size={24} opacity={0.4} />,
    },
    items: [
      {
        name: "Dashboard",
        icon: {
          active: <FaArrowsRotate size={24} />,
          default: <FaArrowsRotate size={24} opacity={0.4} />,
        },
        href: "/production/raw",
        tenantScoped: true,
      },
      {
        name: "Dash",
        icon: {
          active: <FaArrowsRotate size={24} />,
          default: <FaArrowsRotate size={24} opacity={0.4} />,
        },
        href: "/production/raw1",
        tenantScoped: true,
      },
      {
        name: "board",
        icon: {
          active: <FaArrowsRotate size={24} />,
          default: <FaArrowsRotate size={24} opacity={0.4} />,
        },
        href: "/production/raw2",
        tenantScoped: true,
      },
    ],
  },
  {
    name: "Sales",
    icon: {
      active: <FaTicketAlt size={24} />,
      default: <FaTicketAlt size={24} opacity={0.4} />,
    },
    items: [
      {
        name: "Dashboard",
        icon: {
          active: <FaArrowsRotate size={24} />,
          default: <FaArrowsRotate size={24} opacity={0.4} />,
        },
        href: "/sales/raw",
        tenantScoped: true,
      },
      {
        name: "Dash",
        icon: {
          active: <FaArrowsRotate size={24} />,
          default: <FaArrowsRotate size={24} opacity={0.4} />,
        },
        href: "/sales/raw1",
        tenantScoped: true,
      },
      {
        name: "board",
        icon: {
          active: <FaArrowsRotate size={24} />,
          default: <FaArrowsRotate size={24} opacity={0.4} />,
        },
        href: "/sales/raw2",
        tenantScoped: true,
      },
    ],
  },
  {
    name: "Inventory",
    icon: {
      active: <InventoryIcon color="#1e3653" />,
      default: <InventoryIcon />,
    },
    href: "/inventory",
    tenantScoped: true,
  },
  {
    name: "Accounts",
    icon: {
      active: <AccountsIcon color="#1e3653" />,
      default: <AccountsIcon />,
    },
    href: "/accounts",
    tenantScoped: true,
  },
  {
    name: "Customers",
    icon: {
      active: <FaUsers size={24} />,
      default: <FaUsers size={24} opacity={0.4} />,
    },
    href: "/customers",
    tenantScoped: true,
  },
  {
    name: "Teams",
    icon: {
      active: <FaUsers size={24} />,
      default: <FaUsers size={24} opacity={0.4} />,
    },
    href: "/teams",
    tenantScoped: true,
  },
  {
    name: "Reports",
    icon: {
      active: <ReportsIcon color="#1e3653" />,
      default: <ReportsIcon />,
    },
    href: "/reports",
    tenantScoped: true,
  },
  {
    name: "Approvals",
    icon: {
      active: <ApprovalsIcon color="#1e3653" />,
      default: <ApprovalsIcon />,
    },
    href: "/approvals",
    tenantScoped: true,
  },
  {
    name: "Settings",
    icon: {
      active: <FaCog size={24} />,
      default: <FaCog size={24} opacity={0.4} />,
    },
    href: "/settings",
    tenantScoped: true,
  },
];
