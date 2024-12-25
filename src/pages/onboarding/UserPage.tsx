import { FC, ReactElement } from "react";
import UserForm from "@/components/forms/user/UserForm";
import PublicPageWrapper from "@/layout/PublicPageWrapper";

interface UserOnboardingPageProps {}

const UserOnboardingPage: FC<UserOnboardingPageProps> = (): ReactElement => {
  return (
    <PublicPageWrapper>
      <UserForm />
    </PublicPageWrapper>
  );
};

export default UserOnboardingPage;
