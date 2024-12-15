import { FC, ReactElement } from "react";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import EmailForm from "@/components/forms/email/EmailForm";
import { useGetEmailSignature } from "@/lib/api/email/signature/queries";
import { useGetEmailConfig } from "@/lib/api/email/configs/queries";
import { useGetUser } from "@/lib/api/user/queries";
import PageWrapper from "@/layout/PageWrapper";

interface Props {}

const NewEmailPage: FC<Props> = (): ReactElement => {
  const { data: user } = useGetUser();
  const { data: emailConfig, isLoading: isConfigLoading } = useGetEmailConfig();
  const { isLoading: isSignatureLoading } = useGetEmailSignature();

  let from = `${user?.firstName} ${user?.lastName}`;
  if (emailConfig) {
    from += ` <${emailConfig?.email}>`;
  } else {
    from += ` <${import.meta.env.VITE_EMAIL_USER}>`;
  }

  if (isSignatureLoading || isConfigLoading) {
    return <LoadingOverlayer />;
  }

  return (
    <PageWrapper title="newEmail" center>
      <EmailForm from={from} />
    </PageWrapper>
  );
};

export default NewEmailPage;
