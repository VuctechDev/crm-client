import React, { FC, ReactElement } from "react";
import { Form, Formik } from "formik";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import SubmitButton from "../fields/SubmitButton";
import { initialValues, validationSchema } from "./config";
import FormFields from "./FormFields";
import { ROUTES } from "@/lib/consts/routes";
import { TagType } from "@/types/tags";
import { useCreateLead, useUpdateLead } from "@/lib/api/leads/queries";
import { LeadType } from "@/types/leads";
import { getChangedValues } from "@/lib/getChangedValues";
import { getCountry } from "@/lib/getCountry";
import { useNavigate } from "react-router-dom";

interface LeadsFormProps {
  data?: LeadType;
}

const LeadsForm: FC<LeadsFormProps> = ({ data }): ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync: createLead } = useCreateLead();
  const { mutateAsync: updateLead } = useUpdateLead(`${data?.id}`);

  const handleSubmit = async (values: any) => {
    try {
      if (!data) {
        await createLead({
          ...values,
          country: values?.country?.iso3,
          tags: values?.tags.map((x: TagType) => x.id),
        });
        navigate(`${ROUTES.LEADS.ROOT}`);
      } else {
        const changedValues = getChangedValues<LeadType>(
          {
            ...values,
            country: values?.country?.iso3,
            tags: values?.tags.map((x: TagType) => x.id),
          },
          data
        );
        await updateLead({ data: changedValues, id: data.id });
        navigate(`${ROUTES.LEADS.ROOT}/${data.id}`, { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const initialValuesHandler = data
    ? { ...initialValues, ...data, country: getCountry(data.country) }
    : initialValues;
  return (
    <>
      <Typography variant="h6">{t("newLead")}</Typography>
      <Formik
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

export default LeadsForm;
