import { NavItem } from "@/interfaces/global";

export const navItems: NavItem[] = [
  {
    name: "FAQs",
    href: "/faqs",
    tenantScoped: false,
  },
  {
    name: "Log in",
    href: "/login",
    tenantScoped: true,
  },
];
