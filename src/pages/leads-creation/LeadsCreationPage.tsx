import { FC, ReactElement } from "react";
import LeadsForm from "@/components/forms/leads/LeadsForm";
import Card from "@mui/material/Card";
import PageWrapper from "@/layout/PageWrapper";

interface CreateLeadPageProps {}

const CreateLeadPage: FC<CreateLeadPageProps> = (): ReactElement => {
  return (
    <PageWrapper title="newLead" center>
      <Card
        sx={(t) => ({
          width: "100%",
          display: "flex",
          flexDirection: "column",
          rowGap: "24px",
          maxWidth: "900px",
          p: "24px 24px 36px",
          [t.breakpoints.down("sm")]: {
            rowGap: "14px",
            p: "20px",
          },
        })}
      >
        <LeadsForm />
      </Card>
    </PageWrapper>
  );
};

export default CreateLeadPage;
