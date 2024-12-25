import { FC, ReactElement, useRef, useState } from "react";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import Card from "@mui/material/Card";
import TableWrapper from "@/components/table/TableWrapper";
import { Box, Button, IconButton, TextField } from "@mui/material";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FieldLabel from "@/components/forms/fields/FieldLabel";
import ConfirmationModal from "@/components/ConfirmationModal";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import TooltipIconButton from "@/components/TooltipIconButton";
import CreateIcon from "@mui/icons-material/Create";
import TagsWrapper from "@/components/tags/TagsWrapper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useGetTags } from "@/lib/api/tags/queries";
import getSearchQuery from "@/lib/getSearchQuery";
import { LeadType } from "@/types/leads";
import { Link, useNavigate } from "react-router-dom";
import { TagType } from "@/types/tags";
import { useDeleteLead, useGetLeads } from "@/lib/api/leads/queries";
import { getCountryName } from "@/lib/getCountry";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/lib/consts/routes";
import { getDisplayDateTime } from "@/lib/getDisplayDate";
import { getCSVFileName } from "@/lib/getCSVFileName";
import { handleFileDownload } from "@/lib/downloadFile";
import PageWrapper from "@/layout/PageWrapper";

const headers = [
  { key: "name" },
  { key: "role" },
  { key: "email" },
  { key: "company" },
  { key: "industry" },
  { key: "country" },
  { key: "tags" },
  { key: "website" },
  { key: "" },
];

const LeadsPage: FC = (): ReactElement => {
  const selectedTag = getSearchQuery("tag");

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState(
    `page=0&limit=10${selectedTag ? "&tags=" + selectedTag : ""}`
  );
  const { data, isLoading } = useGetLeads(query);
  const { data: tags } = useGetTags();
  const [csvModalOpen, setCSVModalOpen] = useState(false);
  const inputRef = useRef("");
  const [deleteModalId, setDeleteModalId] = useState("");
  const { mutateAsync } = useDeleteLead(deleteModalId);

  const handleDelete = async () => {
    try {
      await mutateAsync(deleteModalId);
      navigate(`${ROUTES.LEADS.ROOT}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteModal = (id?: string) => setDeleteModalId(id ?? "");

  const keys = [
    {
      key: "firstName",
      render: (value: string, data: LeadType) => `${value} ${data?.lastName}`,
    },
    {
      key: "role",
    },
    {
      key: "email",
    },
    {
      key: "company",
    },
    {
      key: "industry",
    },
    {
      key: "country",
      render: (value: string) => getCountryName(value),
    },
    {
      key: "tags",
      render: (value: TagType[]) => (
        <TagsWrapper data={value} small displayCount={2} />
      ),
    },
    {
      key: "website",
      render: (value: string) => (
        <a
          href={value}
          target="_blak"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton>
            <ScreenSearchDesktopOutlinedIcon />
          </IconButton>
        </a>
      ),
      preventClick: true,
    },
    {
      key: "id",
      render: (value: string) => (
        <Box display="flex" justifyContent="center">
          <Link to={`${ROUTES.EMAIL.NEW}/${value}`}>
            <TooltipIconButton
              title="sendEmail"
              icon={<ForwardToInboxOutlinedIcon />}
            />
          </Link>
          <Link to={`${ROUTES.LEADS.ROOT}/${value}/${ROUTES.COMMON.EDIT}`}>
            <TooltipIconButton title="edit" icon={<CreateIcon />} />
          </Link>
          <TooltipIconButton
            onClick={() => handleDeleteModal(value)}
            title="delete"
            icon={<DeleteOutlineIcon color="error" />}
          />
        </Box>
      ),
      preventClick: true,
    },
  ];

  const handleCSVModal = () => setCSVModalOpen((prev) => !prev);

  const handleQueryChange = (query: string) => {
    setQuery(query);
  };

  const noFiltersLabel = `(${t("all")})`;
  const defaultFileName = `${t("leads")} ${
    getCSVFileName(query, { tags: tags?.data ?? [] }) ?? noFiltersLabel
  } - ${getDisplayDateTime()}`;

  const handleExport = async () => {
    await handleFileDownload({
      fileName: inputRef.current ? inputRef.current : defaultFileName,
      query,
    });
  };

  return (
    <PageWrapper
      title="leads"
      actions={
        <>
          <Link to={ROUTES.LEADS.ADD.ROOT}>
            <Button
              variant="outlined"
              color="info"
              startIcon={<GroupAddOutlinedIcon />}
            >
              {t("add")}
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="info"
            startIcon={<FileDownloadIcon />}
            onClick={handleCSVModal}
            disabled={!data?.data?.length}
          >
            {t("exportCSV")}
          </Button>
        </>
      }
    >
      <Card
        elevation={1}
        sx={{
          height: "1",
          borderRadius: "20px",
          width: "100%",
          minWidth: "900px",
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
          handleRowSelect={(id: string) =>
            navigate(ROUTES.LEADS.ROOT + `/${id}`)
          }
          hover={true}
          filterKeys={[
            {
              label: "role",
            },
            {
              label: "industry",
            },
            {
              label: "country",
            },
            {
              label: "tags",
              initialValue: selectedTag,
              options: tags?.data.map((tag) => ({
                value: `${tag.id}`,
                label: tag.tag,
              })),
            },
          ]}
        />
      </Card>
      {csvModalOpen && (
        <ConfirmationModal
          title="exportCSV"
          onCancel={handleCSVModal}
          onConfirm={handleExport}
        >
          <>
            <FieldLabel label="fileName" />
            <TextField
              onChange={(e) => (inputRef.current = e.target.value)}
              fullWidth
              defaultValue={defaultFileName}
            />
          </>
        </ConfirmationModal>
      )}
      {!!deleteModalId && (
        <ConfirmationModal
          title="deleteLead"
          message="deleteLeadConfirmation"
          onCancel={handleDeleteModal}
          onConfirm={handleDelete}
        />
      )}
    </PageWrapper>
  );
};

export default LeadsPage;
