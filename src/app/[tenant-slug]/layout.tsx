import { serverRequest } from "@/services/server";
import { redirect } from "next/navigation";
import { Tenant } from "@/interfaces";
import { TenancyWrapper } from "./_components/tenancy-wrapper";

const PageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { "tenant-slug": string };
}) => {
  // redirect("/maintenance");

  // get slug from url parameter
  const tenantSlug = params?.["tenant-slug"];

  const response = await serverRequest.tenant.resolveTenantSlug(tenantSlug);

  if (!response?.success) {
    redirect("/error/not-found");
  }

  const tenantDetails: Tenant = response?.data;

  // get basic shop details that would be saved to storage
  const basicTenantDetails = {
    id: tenantDetails?.id,
    slug: tenantDetails?.slug,
    name: tenantDetails?.name,
  };

  return (
    <TenancyWrapper tenant={basicTenantDetails}>{children}</TenancyWrapper>
  );
};

export default PageLayout;
