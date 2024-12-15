import { FC, ReactElement } from "react";
import { Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormFields from "@/components/forms/register/FormFields";
import SubmitButton from "@/components/forms/fields/SubmitButton";
import { ROUTES } from "@/lib/consts/routes";
import { useRegister } from "@/lib/api/auth/queries";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PublicPageWrapper from "@/layout/PublicPageWrapper";

export const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export type InitialValues = typeof initialValues;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("invalidEmail")
    .required("requiredField")
    .max(200, "max200char"),
  password: Yup.string()
    .required("requiredField")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.{8,})/,
      ""
    ),
  confirmPassword: Yup.string()
    .required("requiredField")
    .oneOf([Yup.ref(`password`)], "passwordMustMatch"),
});

const RegisterPage: FC = (): ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync } = useRegister();

  const handleSubmit = async (values: InitialValues) => {
    try {
      await mutateAsync(values);
      navigate(
        `${ROUTES.AUTH.REGISTER_CONFIRMATION}?email=${encodeURIComponent(
          values.email
        )}`
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PublicPageWrapper
      title="register"
      actions={
        <>
          <Typography sx={{ mr: "8px" }}>{t("alreadyHaveAccount")}</Typography>
          <Link to={ROUTES.AUTH.LOGIN} style={{ textDecoration: "none" }}>
            <Typography color="info.main">{t("signin")}</Typography>
          </Link>
        </>
      }
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormFields />
            <SubmitButton loading={isSubmitting} label={t("register")} />
          </Form>
        )}
      </Formik>
    </PublicPageWrapper>
  );
};

export default RegisterPage;
