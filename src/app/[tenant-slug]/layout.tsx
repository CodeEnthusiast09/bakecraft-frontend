import { serverRequest } from "@/services/server";
import { redirect } from "next/navigation";
import { Tenant } from "@/interfaces";
import { TenancyWrapper } from "./_components/tenancy-wrapper";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ "tenant-slug": string }>;
}

const PageLayout = async ({ children, params }: LayoutProps) => {
  // redirect("/maintenance");

  // get slug from url parameter
  const resolvedParams = await params;

  const tenantSlug = resolvedParams?.["tenant-slug"];

  const response = await serverRequest.tenant.resolveTenantSlug(tenantSlug);

  if (!response?.success) {
    redirect("/error/not-found");
  }

  const tenantDetails = response?.data;

  // get basic shop details that would be saved to storage
  const basicTenantDetails = {
    id: tenantDetails?.id,
    slug: tenantDetails?.slug,
    companyName: tenantDetails?.company_name,
    companyEmail: tenantDetails?.company_email,
    status: tenantDetails.status,
  };

  return (
    <TenancyWrapper tenant={basicTenantDetails}>{children}</TenancyWrapper>
  );
};

export default PageLayout;
