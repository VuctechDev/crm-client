import React, { FC, ReactElement } from "react";
import { Form, Formik } from "formik";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { initialValues, validationSchema } from "./config";
import FormFields from "./FormFields";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SubmitButton from "../../fields/SubmitButton";
import { useDynamicTagsValidation } from "@/hooks/useDynamicTagsValidation";
import { EmailTemplateType } from "@/types/emails";
import {
  useCreateEmailTemplate,
  useUpdateEmailTemplate,
} from "@/lib/api/email/templates/queries";

interface TemplateFormProps {
  data?: EmailTemplateType | null;
  handleClear: () => void;
}

const TemplateForm: FC<TemplateFormProps> = ({
  data,
  handleClear,
}): ReactElement => {
  const { t } = useTranslation();
  const validateDynamicTags = useDynamicTagsValidation();
  const { mutateAsync: createTemplate } = useCreateEmailTemplate();
  const { mutateAsync: updateTemplate } = useUpdateEmailTemplate();

  const handleSubmit = async (
    values: any,
    { resetForm }: { resetForm: () => void }
  ) => {
    const invalid =
      validateDynamicTags(values.body) || validateDynamicTags(values.subject);
    if (!invalid) {
      try {
        if (data) {
          await updateTemplate(values);
        } else {
          await createTemplate(values);
        }
        handleClear();
        resetForm();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const initialValuesHandler = data ? { ...data } : initialValues;
  return (
    <>
      <Box width={1} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          {!data ? t("newTemplate") : t("editTemplate")}
        </Typography>
        {data && (
          <Box
            sx={(t) => ({
              height: "36px",
              borderRadius: "8px",
              width: "fit-content",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: "0px 3px 0px 8px ",
              border: `1px solid ${t.palette.divider}`,
            })}
          >
            <Typography> {data.name}</Typography>
            <IconButton onClick={handleClear}>
              <CloseIcon fontSize="small" />
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

export default TemplateForm;
