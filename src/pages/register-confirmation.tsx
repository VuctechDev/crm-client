import { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import PublicPageWrapper from "@/layout/PublicPageWrapper";
import { useTranslation } from "react-i18next";
import getSearchQuery from "@/lib/getSearchQuery";

interface RegisterConfirmationProps {}

const RegisterConfirmation: FC<
  RegisterConfirmationProps
> = (): ReactElement => {
  const { t } = useTranslation();
  const email = getSearchQuery("email");

  return (
    <PublicPageWrapper>
      <Typography variant="h5">{t("accountVerification")}</Typography>
      <Box>
        <Typography display="inline" mr="5px">
          {t("registrationVerificationSent")}
        </Typography>
        <Typography display="inline" color="primary" suppressHydrationWarning>
          {email ? email?.toLowerCase() : ""}
        </Typography>
      </Box>

      <Typography>{t("pleaseCheckVerificatinInbox")}</Typography>
    </PublicPageWrapper>
  );
};

export default RegisterConfirmation;
