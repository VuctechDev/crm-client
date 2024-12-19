import { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { Card, Typography } from "@mui/material";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import EmailConfigForm from "@/components/forms/email/config/EmailConfigForm";
import PageWrapper from "@/layout/PageWrapper";
import { useGetEmailConfig } from "@/lib/api/email/configs/queries";
import { useTranslation } from "react-i18next";

interface EmailConfigPageProps {}

const EmailConfigPage: FC<EmailConfigPageProps> = (): ReactElement => {
  const { t } = useTranslation();
  const { data: config, isLoading } = useGetEmailConfig();

  if (isLoading) {
    return <LoadingOverlayer />;
  }

  return (
    <PageWrapper title="emailConfig" center>
      <Card
        sx={(t) => ({
          width: "100%",
          display: "flex",
          flexDirection: "column",
          rowGap: "24px",
          maxWidth: "500px",
          p: "24px 24px 36px",
          [t.breakpoints.down("sm")]: {
            rowGap: "14px",
            p: "20px",
          },
        })}
      >
        {config ? (
          <Box display="flex">
            <Typography>
              {t("emailConfigured")}{" "}
              <Typography
                color="info.main"
                sx={{ ml: "5px", display: "inline" }}
              >
                {config?.email}
              </Typography>
            </Typography>
          </Box>
        ) : (
          <EmailConfigForm />
        )}
      </Card>
    </PageWrapper>
  );
};

export default EmailConfigPage;
