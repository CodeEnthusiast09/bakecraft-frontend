import { Base } from "./global";

export interface User extends Base {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  image: string;
}

export interface Role extends Base {
  name: string;
  description?: string;
  permissions?: Permission[];
  users?: User[];
}

export interface Permission extends Base {
  name: string;
}
