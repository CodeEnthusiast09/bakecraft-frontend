import { ReactElement } from "react";
import { User } from "./user";

export interface NavItem {
  name: string;
  href: string;
  tenantScoped: boolean;
}

export interface SidebarItem {
  name: string;
  icon: {
    active: ReactElement;
    default: ReactElement;
  };
  href: string;
  tenantScoped: boolean;
}

export interface SidebarModule {
  name: string;
  icon: {
    active: ReactElement;
    default: ReactElement;
  };
  href?: string;
  items?: SidebarItem[];
  tenantScoped?: boolean;
}

export interface Base {
  id: string;
  createdBy?: string;
  creator?: User;
  createdAt?: string;
  status?: string;
}

export interface Pagination {
  currentPage?: number;
  hasMorePages?: boolean;
  lastPage?: number;
  perPage?: number;
  total?: number;
}
