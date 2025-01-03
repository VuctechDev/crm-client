import { FC, ReactElement } from "react";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { initialValues, validationSchema } from "./config";
import FormFields from "./FormFields";
import SubmitButton from "../fields/SubmitButton";
import Card from "@mui/material/Card";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import { useDynamicTagsValidation } from "@/hooks/useDynamicTagsValidation";
import { TagType } from "@/types/tags";
import { useSendEmail } from "@/lib/api/email/queries";
import { useGetEmailSignature } from "@/lib/api/email/signature/queries";

interface EmailFormProps {
  emailTo?: string;
  emailFrom?: string;
  lead?: string;
  tags?: number[];
}

const EmailForm: FC<EmailFormProps> = ({
  emailTo,
  emailFrom,
  lead,
  tags,
}): ReactElement => {
  const { data: signature, isLoading } = useGetEmailSignature();
  const { t } = useTranslation();
  const validateDynamicTags = useDynamicTagsValidation();
  const { mutateAsync: sendEmail } = useSendEmail();

  if (isLoading) {
    return <LoadingOverlayer />;
  }

  const handleSubmit = async (values: any) => {
    const invalid = validateDynamicTags(values.body) || validateDynamicTags(values.subject);
    if (!invalid) {
      try {
        await sendEmail({
          ...values,
          tags: values?.tags.map((tag: TagType) => tag?.id),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  let body = signature ? `<p><br/></p> <p><br/></p> ${signature?.body}` : "";

  return (
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
      <Formik
        initialValues={{ ...initialValues, emailFrom, emailTo, body, lead }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty }) => (
          <Form>
            <FormFields lead={lead} />
            <SubmitButton
              disabled={!dirty}
              loading={isSubmitting}
              label={t("send")}
            />
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default EmailForm;
