import { FC, ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "@/components/ConfirmationModal";
import LoadingSkeleton from "./LoadingSkeleton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SubmitButton from "../forms/fields/SubmitButton";
import {
  useCreateComment,
  useGetComments,
  useDeleteComment,
} from "@/lib/api/comments/queries";
import { useGetUser } from "@/lib/api/user/queries";
import { getDisplayDateTime } from "@/lib/getDisplayDate";

interface CommentsProps {
  parentId: string;
}

const Comments: FC<CommentsProps> = ({ parentId }): ReactElement => {
  const { t } = useTranslation();
  console.log(parentId);

  const [count, setCount] = useState(5);
  const [comment, setComment] = useState("");
  const [deleteModalID, setDeleteModalID] = useState("");

  const { mutateAsync: createComment, isPending } = useCreateComment();
  const { data, isLoading } = useGetComments(parentId, count);
  const { mutateAsync: deleteComment } = useDeleteComment();
  const { data: user } = useGetUser();

  const handleModal = (id?: string) => setDeleteModalID(id ?? "");

  const handleCreate = async () => {
    try {
      await createComment({
        comment,
        parent: parentId,
      });
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(deleteModalID);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  let loadMore = (data?.total || data?.total === 0) && data?.total > count;

  let paginationLabel = `${data?.total} / ${data?.total}`;

  if (loadMore) {
    paginationLabel = `${count} / ${data?.total}`;
  }

  return (
    <Box width={1} sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={(t) => ({
          width: "1000px",
          display: "flex",
          flexDirection: "column",
          p: "32px",
          [t.breakpoints.down("sm")]: {
            rowGap: "14px",
            p: "14px",
          },
        })}
      >
        <Typography>{t("newComment")}</Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={comment}
          sx={(t) => ({
            mt: "12px",
            mb: "28px",
            [t.breakpoints.down("sm")]: {
              mt: "4px",
              mb: "0px",
            },
          })}
          onChange={(e) => setComment(e.target.value)}
        />
        <Box width={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <SubmitButton
            onClick={handleCreate}
            label={t("save")}
            disabled={!comment}
            loading={isPending}
            type="button"
            sx={{ mb: "0px", mt: "0px", maxWidth: "100px" }}
          />
        </Box>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          data?.data?.map((comment) => (
            <Box
              key={comment.id}
              sx={(t) => ({
                mt: "20px",
                [t.breakpoints.down("sm")]: {
                  mt: "10px",
                },
              })}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography color="info.main">
                  {comment.createdBy.firstName} {comment.createdBy.lastName}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">
                    {getDisplayDateTime(comment.createdAt)}
                  </Typography>
                  {user?.id === comment.createdBy.id && (
                    <IconButton
                      onClick={() => handleModal(comment.id)}
                      sx={(t) => ({
                        fontSize: t.typography.h5.fontSize,
                        ml: "6px",
                      })}
                    >
                      <DeleteOutlinedIcon fontSize="inherit" />
                    </IconButton>
                  )}
                </Box>
              </Box>
              <Box sx={{ mt: "8px", pl: "12px" }}>
                <Typography>{comment.comment}</Typography>
              </Box>
              <Divider sx={{ width: "100%", my: "12px" }} />
            </Box>
          ))
        )}
        {!!data?.total && (
          <Typography
            variant="body2"
            textAlign="center"
            sx={(t) => ({
              mt: "30px",
              [t.breakpoints.down("sm")]: {
                mt: "0px",
              },
            })}
          >
            {paginationLabel}
          </Typography>
        )}

        {loadMore && (
          <Box
            width={1}
            sx={{ display: "flex", justifyContent: "center", mt: "12px" }}
          >
            <Button onClick={() => setCount((prev) => prev + 5)}>
              {t("loadMore")}
            </Button>
          </Box>
        )}
      </Card>
      {!!deleteModalID && (
        <ConfirmationModal
          title="deleteComment"
          message="deleteLeadConfirmation"
          onCancel={() => handleModal()}
          onConfirm={handleDelete}
        />
      )}
    </Box>
  );
};

export default Comments;
