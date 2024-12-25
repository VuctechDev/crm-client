import { FC, ReactElement, useState } from "react";
import Card from "@mui/material/Card";
import TableWrapper from "@/components/table/TableWrapper";
import { Box, Button, Palette, Typography } from "@mui/material";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import { LeadType } from "@/types/leads";
import { useTranslation } from "react-i18next";
import { EmailType } from "@/types/emails";
import { Link } from "react-router-dom";
import { useGetEmails } from "@/lib/api/email/queries";
import { getDisplayDateTime } from "@/lib/getDisplayDate";
import { ROUTES } from "@/lib/consts/routes";
import PageWrapper from "@/layout/PageWrapper";

interface Props {}

const headers = [
  { key: "from" },
  { key: "to" },
  { key: "subject" },
  { key: "status" },
  { key: "readAt" },
  { key: "sentAt" },
];

const EmailsPage: FC<Props> = (): ReactElement => {
  const { t } = useTranslation();

  const [query, setQuery] = useState("page=0&limit=10");
  const { data, isLoading } = useGetEmails(query);

  const keys = [
    {
      key: "emailFrom",
      render: (value: string, data: { lead: LeadType }) => {
        if (!value) {
          return (
            <Typography>{`${data?.lead?.firstName} ${data?.lead?.lastName}`}</Typography>
          );
        }
        return value;
      },
    },

    {
      key: "lead",
      render: (
        value: {
          firstName: string;
          lastName: string;
          email: string;
        },
        data: EmailType
      ) => (
        <Typography>
          {value && `${value?.firstName} ${value?.lastName}`} {value && <br />}
          {`${data?.emailTo}`}
        </Typography>
      ),
    },
    {
      key: "subject",
    },
    {
      key: "status",
      render: (value: string) => {
        let bg: keyof Palette = "info";
        if (value === "failed") {
          bg = "warning";
        } else if (value === "read") {
          bg = "success";
        }
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              textAlign="center"
              color="#fff"
              sx={(t) => ({
                p: "6px",
                backgroundColor: t.palette[bg].main,
                borderRadius: "12px",
                width: "70px",
              })}
            >
              {t(value)}
            </Typography>
          </Box>
        );
      },
    },
    {
      key: "updatedAt",
      render: (value: string, data: EmailType) => {
        if (data.status !== "read") {
          return <Typography variant="body2">/</Typography>;
        } else {
          return (
            <Typography variant="body2">{getDisplayDateTime(value)}</Typography>
          );
        }
      },
    },
    {
      key: "createdAt",
      render: (value: string) => (
        <Typography variant="body2">{getDisplayDateTime(value)}</Typography>
      ),
    },
  ];

  const handleQueryChange = (query: string) => {
    setQuery(query);
  };

  return (
    <PageWrapper
      title="emails"
      actions={
        <Link to={ROUTES.EMAIL.NEW}>
          <Button
            variant="outlined"
            color="info"
            startIcon={<ForwardToInboxOutlinedIcon />}
          >
            {t("new")}
          </Button>
        </Link>
      }
    >
      {/* <StatsWrapper /> */}
      <Card
        sx={{
          p: "0px",
          height: "1",
          borderRadius: "20px",
          width: "100%",
          minWidth: "600px",
        }}
      >
        <TableWrapper
          data={data?.data ?? []}
          headers={headers}
          keys={keys}
          loading={isLoading}
          totalCount={data?.total ?? 0}
          skeletonCount={8}
          handleQueryChange={handleQueryChange}
          handleRowSelect={(id: string) => null}
          hover={false}
          filterKeys={[
            {
              label: "status",
              options: [
                { label: "sent", value: "sent" },
                { label: "read", value: "read" },
                { label: "failed", value: "failed" },
              ],
            },
          ]}
        />
      </Card>
    </PageWrapper>
  );
};

export default EmailsPage;
