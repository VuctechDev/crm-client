import { FC, ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Card, Divider, Typography } from "@mui/material";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import ConfirmationModal from "@/components/ConfirmationModal";
import Comments from "@/components/comments/Comments";
import TagsWrapper from "@/components/tags/TagsWrapper";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCountryName } from "@/lib/getCountry";
import PageWrapper from "@/layout/PageWrapper";
import { ROUTES } from "@/lib/consts/routes";
import { getDisplayDateTime } from "@/lib/getDisplayDate";
import { useDeleteLead, useGetLeadById } from "@/lib/api/leads/queries";

const LeadProfilePage: FC = (): ReactElement => {
  const { t } = useTranslation();

  const params = useParams() as { _id: string };
  const navigate = useNavigate();
  const { data, isLoading } = useGetLeadById(params?._id);
  const { mutateAsync } = useDeleteLead(params?._id);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleModal = () => setDeleteModalOpen((prev) => !prev);

  const handleDelete = async () => {
    try {
      await mutateAsync(params?._id);
      navigate(`${ROUTES.LEADS.ROOT}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <LoadingOverlayer />;
  }

  const name = data?.firstName + " " + data?.lastName;

  return (
    <PageWrapper
      title={name}
      labels={{ 1: data?.firstName }}
      actions={
        <>
          <Link
            to={`${ROUTES.LEADS.ROOT}/${params?._id}/${ROUTES.COMMON.EDIT}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="outlined"
              color="info"
              startIcon={<BorderColorIcon />}
            >
              {t("edit")}
            </Button>
          </Link>
          <Button color="error" variant="outlined" onClick={handleModal}>
            {t("delete")}
          </Button>
        </>
      }
    >
      <Box
        sx={(t) => ({
          display: "flex",
          justifyContent: "space-between",
          [t.breakpoints.down("sm")]: {
            flexDirection: "column",
            rowGap: "28px",
          },
        })}
      >
        <Box
          sx={(t) => ({
            display: "flex",
            flexDirection: "column",
            rowGap: "8px",
            width: "fit-content",
            [t.breakpoints.down("sm")]: {
              mt: "24px",
            },
          })}
        >
          <Typography variant="body2">
            {getDisplayDateTime(data?.created)}
          </Typography>
          <Typography variant="h5">{data?.role}</Typography>

          {data?.email && (
            <Box sx={{ display: "flex", alignItems: "center", mt: "8px" }}>
              <AlternateEmailIcon sx={{ mr: "10px" }} />
              <Typography> {data?.email}</Typography>
            </Box>
          )}
          {data?.mobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SmartphoneIcon sx={{ mr: "10px" }} />
              <Typography> {data?.mobile}</Typography>
            </Box>
          )}
          {data?.phone && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PhoneEnabledIcon sx={{ mr: "10px" }} />
              <Typography> {data?.phone}</Typography>
            </Box>
          )}
        </Box>
        <Card
          sx={(t) => ({
            display: "flex",
            // flexWrap: "wrap",
            alignItems: "center",
            p: "28px",
            borderRadius: "8px",
            width: "fit-content",
            minWidth: "300px",
            height: "fit-content",
            [t.breakpoints.down("sm")]: {
              minWidth: "100%",
              p: "10px ",
            },
          })}
        >
          <Typography
            sx={(t) => ({
              mr: "12px",
              [t.breakpoints.down("sm")]: {
                mr: "8px",
              },
            })}
            variant="h4"
          >
            {t("tags")}:
          </Typography>
          <TagsWrapper data={data?.tags ?? []} />
        </Card>
      </Box>
      <Card
        sx={(t) => ({
          display: "inline-flex",
          flexDirection: "column",
          rowGap: "8px",
          mt: "44px",
          p: "32px",
          borderRadius: "8px",
          width: "fit-content",
          minWidth: "300px",
          [t.breakpoints.down("sm")]: {
            minWidth: "100%",
            p: "16px ",
          },
        })}
      >
        {data?.company && <Typography variant="h4">{data?.company}</Typography>}
        {data?.industry && (
          <Typography variant="h5">{data?.industry}</Typography>
        )}
        {data?.description && <Typography>{data?.description}</Typography>}
        <Box sx={{ display: "flex", alignItems: "center", mt: "20px" }}>
          <LocationOnIcon sx={{ mr: "10px" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "6px",
            }}
          >
            <Typography>{data?.address}</Typography>
            {(data?.zip || data?.city) && (
              <Typography>
                {data?.zip && data?.city
                  ? `${data?.zip}, ${data?.city}`
                  : `${data?.zip} ${data?.city}`}
              </Typography>
            )}
            {data?.country && (
              <Typography>{getCountryName(data?.country)}</Typography>
            )}
          </Box>
        </Box>

        {data?.employees && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <GroupIcon sx={{ mr: "10px" }} />
            <Typography> {data.employees}</Typography>
          </Box>
        )}
        {data?.website && (
          <a href={data?.website} target="_blak">
            <Button variant="outlined" color="info" sx={{ mt: "20px" }}>
              {t("website")}
            </Button>
          </a>
        )}
      </Card>
      <Divider
        sx={(t) => ({
          width: "100%",
          my: "60px",
          [t.breakpoints.down("sm")]: {
            my: "40px",
          },
        })}
      />
      <Comments parentId={params?._id} />
      {deleteModalOpen && (
        <ConfirmationModal
          title="deleteLead"
          message="deleteLeadConfirmation"
          onCancel={handleModal}
          onConfirm={handleDelete}
        />
      )}
    </PageWrapper>
  );
};

export default LeadProfilePage;
