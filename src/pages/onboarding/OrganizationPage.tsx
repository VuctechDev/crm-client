import { FC, ReactElement } from "react";
import OrganizationForm from "@/components/forms/organization/OrganizationForm";
import PublicPageWrapper from "@/layout/PublicPageWrapper";

interface OrganizationOnboardingPageProps {}

const OrganizationOnboardingPage: FC<
  OrganizationOnboardingPageProps
> = (): ReactElement => {
  return (
    <PublicPageWrapper>
      <OrganizationForm />
    </PublicPageWrapper>
  );
};

export default OrganizationOnboardingPage;
