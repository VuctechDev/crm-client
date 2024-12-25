import { FC, ReactElement } from "react";
import { Form, Formik } from "formik";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import SubmitButton from "../fields/SubmitButton";
import { initialValues, validationSchema } from "./config";
import FormFields from "./FormFields";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TagType } from "@/types/tags";
import { useCreateTag, useUpdateTag } from "@/lib/api/tags/queries";

interface TagsFormProps {
  data?: TagType | null;
  handleClear: () => void;
}

const TagsForm: FC<TagsFormProps> = ({ data, handleClear }): ReactElement => {
  console.log(data);
  const { t } = useTranslation();
  const { mutateAsync: createTag } = useCreateTag();
  const { mutateAsync: updateTag } = useUpdateTag();

  const handleSubmit = async (values: any) => {
    try {
      if (data) {
        await updateTag(values);
      } else {
        await createTag(values);
      }
      handleClear();
    } catch (error) {
      console.error(error);
    }
  };

  const initialValuesHandler = data ? { ...data } : initialValues;
  return (
    <>
      <Box width={1} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          {!data ? t("newTag") : t("editTag")}
        </Typography>
        {data && (
          <Box
            sx={{
              height: "30px",
              borderRadius: "8px",
              backgroundColor: data.color,
              width: "fit-content",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: "6px 3px 6px 8px ",
            }}
          >
            <Typography color="#fff"> {data.tag}</Typography>
            <IconButton onClick={handleClear}>
              <CloseIcon fontSize="small" htmlColor="#fff" />
            </IconButton>
          </Box>
        )}
      </Box>

      <Formik
        key={data?.id}
        initialValues={initialValuesHandler}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty }) => (
          <Form>
            <FormFields />
            <SubmitButton
              disabled={!dirty}
              loading={isSubmitting}
              label={data ? t("update") : t("create")}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TagsForm;
