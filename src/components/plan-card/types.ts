import { Plan } from "@/interfaces/plan";

export interface PlanCardProps {
  data: Plan[];
  isLoading?: boolean;
  page?: "home" | "subscription";
}
