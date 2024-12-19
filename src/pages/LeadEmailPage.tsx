import { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import EmailForm from "@/components/forms/email/EmailForm";
import PageWrapper from "@/layout/PageWrapper";
import { useParams } from "react-router-dom";
import { useGetLeadById } from "@/lib/api/leads/queries";
import { useGetEmailConfig } from "@/lib/api/email/configs/queries";
import { useGetEmailSignature } from "@/lib/api/email/signature/queries";
import { useGetUser } from "@/lib/api/user/queries";

interface NewLeadEmailPageProps {}

const NewLeadEmailPage: FC<NewLeadEmailPageProps> = (): ReactElement => {
  const params = useParams() as { _id: string };
  const { data, isLoading } = useGetLeadById(params?._id);
  const { data: emailConfig, isLoading: configLoading } = useGetEmailConfig();
  const { isLoading: isSignatureLoading } = useGetEmailSignature();
  const { data: user } = useGetUser();

  if (isLoading || configLoading || isSignatureLoading) {
    return <LoadingOverlayer />;
  }

  let from = `${user?.firstName} ${user?.lastName}`;
  if (emailConfig) {
    from += ` <${emailConfig?.email}>`;
  } else {
    from += ` <${process.env.NEXT_PUBLIC_EMAIL_USER}>`;
  }
  const name = `${data?.firstName} ${data?.lastName}`;

  return (
    <PageWrapper title={name} labels={{ 2: data?.firstName }} center>
      <Box
        width={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          p: "20px",
        }}
      >
        <EmailForm to={data?.email} from={from} lead={params?._id} />
      </Box>
    </PageWrapper>
  );
};

export default NewLeadEmailPage;
