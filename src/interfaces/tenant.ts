import { Base } from "./global";

export interface Tenant extends Base {
  slug: string;
  company_name: string;
}

export interface DocumentTypes extends Base {
  name: string;
}
