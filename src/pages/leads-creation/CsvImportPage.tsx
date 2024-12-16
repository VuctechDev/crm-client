import { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import FilePicker from "@/components/file-picker/FIlePicker";
import { Button, Typography } from "@mui/material";
import PageWrapper from "@/layout/PageWrapper";
import { useTranslation } from "react-i18next";

interface CsvImportPageProps {}

const CsvImportPage: FC<CsvImportPageProps> = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <PageWrapper title="importCSV" center>
      <Box
        width={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FilePicker type="csv" />

        <Typography variant="h6" my="28px">
          {t("csvUploadDescription")}
        </Typography>
        <a download href="/template.csv">
          <Button color="info" variant="outlined">
            {t("downloadCSVTemplate")}
          </Button>
        </a>
      </Box>
    </PageWrapper>
  );
};

export default CsvImportPage;
