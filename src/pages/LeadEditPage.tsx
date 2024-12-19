import { FC, ReactElement } from "react";
import LeadsForm from "@/components/forms/leads/LeadsForm";
import Card from "@mui/material/Card";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import { useParams } from "react-router-dom";
import { useGetLeadById } from "@/lib/api/leads/queries";
import PageWrapper from "@/layout/PageWrapper";

interface LeadEditPageProps {}

const LeadEditPage: FC<LeadEditPageProps> = (): ReactElement => {
  const params = useParams() as { _id: string };
  const { data, isLoading } = useGetLeadById(params?._id);

  if (isLoading) {
    return <LoadingOverlayer />;
  }
  const name = data?.firstName + " " + data?.lastName;
  return (
    <PageWrapper title={name} labels={{ 1: data?.firstName }} center>
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
        <LeadsForm data={data} />
      </Card>
    </PageWrapper>
  );
};

export default LeadEditPage;
