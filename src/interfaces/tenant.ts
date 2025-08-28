import { Base } from "./global";

export interface Tenant extends Base {
  slug: string;
  company_name: string;
  company_email: string;
  company_phone_number: string;
  status: string;
}
