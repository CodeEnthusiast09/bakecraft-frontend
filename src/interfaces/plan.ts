export interface Plan {
  id: string;
  created_at: string;
  updated_at: string;
  planCode: string;
  name: string;
  amount: number;
  interval: string;
  currency: string;
  active: boolean;
  description: string;
}
