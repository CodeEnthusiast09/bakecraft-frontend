import { User } from "./user";

export interface NavItem {
  name: string;
  href: string;
}

export interface Base {
  id: string;
  createdBy?: string;
  creator?: User;
  createdAt?: string;
  status?: string;
}
