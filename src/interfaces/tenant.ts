import { Base } from "./global";

export interface Tenant extends Base {
  slug: string;
  companyName: string;
  companyEmail: string;
  status: string;
}
