import { FC, ReactElement, useEffect, useState } from "react";
import { Box, TextField, Card } from "@mui/material";
import { useTranslation } from "react-i18next";
import EmailEditor from "./Editor";
import { useSnackbar } from "@/components/providers/SnackbarContext";
import { useSendEmail } from "@/lib/api/email/queries";
import { useGetEmailConfig } from "@/lib/api/email/configs/queries";
import { useGetEmailSignature } from "@/lib/api/email/signature/queries";

interface NewEmailProps {
  to?: string;
  from?: string;
  lead?: string;
}

const NewEmail: FC<NewEmailProps> = ({ to, from, lead }): ReactElement => {
  const { t } = useTranslation();
  const { openSnackbar } = useSnackbar();
  const { mutateAsync, isPending } = useSendEmail();
  const { data: emailSignature } = useGetEmailSignature();
  const { data: emailConfig, isLoading: isConfigLoading } = useGetEmailConfig();

  const [fromValue, setFromValue] = useState(from ?? "");
  const [toValue, setToValue] = useState(to ?? "");
  const [subject, setSubject] = useState("");

  const handleSubmit = async (body: string) => {
    try {
      await mutateAsync({
        body,
        from: fromValue,
        to: toValue,
        subject,
        lead: lead ?? "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!emailConfig && !isConfigLoading) {
      openSnackbar(
        `${t("noEmailConfigurationWarning")} ${
          import.meta.env.VITE_EMAIL_USER
        }`,
        "warning"
      );
    }
  }, [isConfigLoading, emailConfig]);

  const initialValue = emailSignature
    ? `<p><br/></p> <p><br/></p> ${emailSignature.body}`
    : "";

  return (
    <Card sx={{ display: "flex", flexDirection: "column", pt: "16px" }}>
      <Box width={1} sx={{ px: "0px" }}>
        <TextField
          fullWidth
          value={fromValue}
          variant="standard"
          placeholder={t("from")}
          onChange={(e) => setFromValue(e.target.value)}
          sx={(t) => ({
            mb: "12px",
            "& div:before": { borderColor: t.palette.text.disabled },
            "& div": { pl: "12px", pb: "12px" },
          })}
          inputProps={{ readOnly: true, sx: { cursor: "not-allowed" } }}
        />
        <TextField
          fullWidth
          value={toValue}
          variant="standard"
          placeholder={t("to")}
          onChange={(e) => setToValue(e.target.value)}
          sx={(t) => ({
            mb: "12px",
            "& div:before": { borderColor: t.palette.text.disabled },
            "& div": { pl: "12px", pb: "12px" },
          })}
          inputProps={{
            readOnly: !!to,
            sx: { cursor: !to ? "unset" : "not-allowed" },
          }}
        />
        <TextField
          fullWidth
          value={subject}
          variant="standard"
          placeholder={t("subject")}
          onChange={(e) => setSubject(e.target.value)}
          sx={(t) => ({
            "& div:before": { borderColor: t.palette.text.disabled },
            "& div": { pl: "12px", pb: "12px" },
          })}
        />
      </Box>
      <EmailEditor
        handleSubmit={handleSubmit}
        loading={isPending}
        initialValue={initialValue}
      />
    </Card>
  );
};

export default NewEmail;
