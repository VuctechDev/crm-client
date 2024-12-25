import { FC, ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TagsForm from "@/components/forms/tags/TagsForm";
import { Grid, Tooltip, Typography } from "@mui/material";
import TableWrapper from "@/components/table/TableWrapper";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TooltipIconButton from "@/components/TooltipIconButton";
import CreateIcon from "@mui/icons-material/Create";
import ConfirmationModal from "@/components/ConfirmationModal";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TagItem from "@/components/tags/TagItem";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ROUTES } from "@/lib/consts/routes";
import { TagType } from "@/types/tags";
import { getDisplayDateTime } from "@/lib/getDisplayDate";
import { useNavigate } from "react-router-dom";
import { useDeleteTag, useGetPaginatedTags } from "@/lib/api/tags/queries";
import PageWrapper from "@/layout/PageWrapper";

const headers = [
  { key: "tag" },
  { key: "leads" },
  { key: "description" },
  { key: "createdAt" },
  { key: "" },
];

interface Props {}

const TagsPage: FC<Props> = (): ReactElement => {
  const [query, setQuery] = useState("page=0&limit=10");
  const [deleteId, setDeleteId] = useState("");
  const [selectedTag, setSelectedTag] = useState<TagType | null>(null);

  const navigate = useNavigate();
  const { data, isLoading } = useGetPaginatedTags(query);
  const { mutateAsync: deleteTag } = useDeleteTag();
  const handleQueryChange = (query: string) => {
    setQuery(query);
  };

  const handleModal = (id?: string) => setDeleteId(id ?? "");

  const handleLeadsPreview = (tagID: string) =>
    navigate(`${ROUTES.LEADS.ROOT}?tag=${tagID}`);

  const handleDelete = async () => {
    try {
      await deleteTag(deleteId);
    } catch (error) {
      console.error(error);
    }
  };

  const keys = [
    {
      key: "tag",
      render: (value: string, data: TagType) => (
        <Box
          width={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <TagItem data={data} />
        </Box>
      ),
    },
    {
      key: "leadsCount",
      render: (value: string) => <Typography> {value}</Typography>,
    },
    {
      key: "description",
      render: (value: string) => (
        <Tooltip title={value} sx={{ width: "60px" }}>
          <InfoOutlinedIcon sx={{ cursor: "pointer" }} />
        </Tooltip>
      ),
    },
    {
      key: "createdAt",
      render: (value: string) => (
        <Typography variant="body2">{getDisplayDateTime(value)}</Typography>
      ),
    },
    {
      key: "id",
      render: (value: string, data: TagType) => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TooltipIconButton
            title="edit"
            icon={<CreateIcon />}
            onClick={() => setSelectedTag(data)}
          />
          <TooltipIconButton
            disabledMessage={!data.leadsCount ? "NoLeadsAssigned" : ""}
            title="viewAssignedLeads"
            icon={<VisibilityOutlinedIcon />}
            onClick={() => handleLeadsPreview(value)}
          />
          <TooltipIconButton
            disabledMessage={
              data.leadsCount ? "TagCantBeDeletedWhileLeads" : ""
            }
            title="delete"
            icon={<DeleteOutlineOutlinedIcon />}
            onClick={() => setDeleteId(value)}
          />
        </Box>
      ),
      preventClick: true,
    },
  ];

  return (
    <PageWrapper title="tags">
      <Grid
        container
        rowSpacing="24px"
        columnSpacing={5}
        sx={(t) => ({
          px: "20px",
          [t.breakpoints.down("sm")]: {
            px: "6px",
          },
        })}
      >
        <Grid item xs={12} md={8}>
          <Card
            sx={(t) => ({
              width: "100%",
              display: "flex",
              flexDirection: "column",
              [t.breakpoints.down("sm")]: {
                rowGap: "20px",
              },
            })}
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
              filterKeys={[]}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={(t) => ({
              width: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "24px",
              maxWidth: "430px",
              p: "24px 24px 36px",
              [t.breakpoints.down("sm")]: {
                rowGap: "14px",
                p: "20px",
              },
            })}
          >
            <TagsForm
              data={selectedTag}
              handleClear={() => setSelectedTag(null)}
            />
          </Card>
        </Grid>
      </Grid>
      {!!deleteId && (
        <ConfirmationModal
          title="deleteTag"
          message="deleteLeadConfirmation"
          onCancel={() => handleModal()}
          onConfirm={handleDelete}
        />
      )}
    </PageWrapper>
  );
};

export default TagsPage;
