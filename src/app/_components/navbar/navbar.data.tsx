import { NavItem } from "@/interfaces/global";
import { tenantPath } from "@/lib/tenantRouter";

export const navItems: NavItem[] = [
  {
    name: "FAQs",
    href: "/faqs",
  },
  {
    name: "Log in",
    href: tenantPath("/login"),
  },
];
