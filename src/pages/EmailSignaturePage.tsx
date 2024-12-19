import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import "react-quill/dist/quill.snow.css";
import EmailEditor from "@/components/email/Editor";
import { Card } from "@mui/material";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import PageWrapper from "@/layout/PageWrapper";
import { getCountryName } from "@/lib/getCountry";
import {
  useCreateEmailSignature,
  useGetEmailSignature,
  useUpdateEmailSignature,
} from "@/lib/api/email/signature/queries";
import { useGetUser } from "@/lib/api/user/queries";
import { useTranslation } from "react-i18next";

interface SignaturePageProps {}

const EmailSignaturePage: FC<SignaturePageProps> = (): ReactElement => {
  const { t } = useTranslation();

  const { data, isLoading } = useGetEmailSignature();
  const { data: user } = useGetUser();
  const { mutateAsync: createSignature, isPending: creationLoading } =
    useCreateEmailSignature();
  const { mutateAsync: updateSignature, isPending: updateLoading } =
    useUpdateEmailSignature();

  const handleSubmit = async (body: string) => {
    try {
      if (data) {
        await updateSignature(body);
      } else {
        await createSignature(body);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <LoadingOverlayer />;
  }

  const defaultSignature = `
  <h4>${t("defaultSignatureLabel")}</h4>
  <p><br/></p>
  <p><span style="color: rgb(136, 136, 136);">${user?.firstName} ${
    user?.lastName
  }, </span></p>
  <p><span style="color: rgb(136, 136, 136);">${user?.phone} </span></p>
  <p><span style="color: rgb(136, 136, 136);">${user?.role} - ${
    user?.organization?.name
  }, </span></p>
  <p><span style="color: rgb(136, 136, 136);">${
    user?.organization?.city
  }, ${getCountryName(user?.organization?.country)}</span></p>
`;
  return (
    <PageWrapper title="emailSignature">
      <Box
        width={1}
        sx={(t) => ({
          display: "flex",
          minHeight: "600px",
          justifyContent: "center",
          alignItems: "center",
          [t.breakpoints.down("sm")]: {
            flexDirection: "column",
            justifyContent: "flex-start",
            rowGap: "24px",
          },
        })}
      >
        <Card>
          <EmailEditor
            handleSubmit={handleSubmit}
            loading={creationLoading || updateLoading}
            initialValue={data ? data?.body : defaultSignature}
            label="save"
          />
        </Card>
      </Box>
    </PageWrapper>
  );
};

export default EmailSignaturePage;
