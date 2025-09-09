export type DashboardCardProps = {
  icon?: React.ElementType<{
    color?: string;
    size?: number | string;
    opacity?: number | string;
  }>;
  title?: string;
  description?: string;
  href: string;
  tenantScoped?: boolean;
};
