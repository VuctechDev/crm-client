import { FC, ReactElement } from "react";
import { Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormFields from "@/components/forms/login/FormFields";
import SubmitButton from "@/components/forms/fields/SubmitButton";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLogin } from "@/lib/api/auth/queries";
import { ROUTES } from "@/lib/consts/routes";
import getSearchQuery from "@/lib/getSearchQuery";
import PublicPageWrapper from "@/layout/PublicPageWrapper";

const dev = import.meta.env.DEV;

export const initialValues = dev
  ? {
      email: "stefan8vucic@gmail.com",
      password: "Aa123123@",
    }
  : {
      email: "",
      password: "",
    };

export type InitialValues = typeof initialValues;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("invalidEmail")
    .required("requiredField")
    .max(200, "max200char"),
  password: Yup.string().required("requiredField"),
});

const LoginPage: FC = (): ReactElement => {
  const { t } = useTranslation();
  const { mutateAsync } = useLogin();
  const email = getSearchQuery("email");

  const handleSubmit = async (values: InitialValues) => {
    try {
      await mutateAsync(values);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PublicPageWrapper
      title="signin"
      actions={
        <>
          <Typography sx={{ mr: "8px" }}>{t("noAccountYet")}</Typography>
          <Link to={ROUTES.AUTH.REGISTER} style={{ textDecoration: "none" }}>
            <Typography color="info.main">{t("register")}</Typography>
          </Link>
        </>
      }
    >
      <Formik
        initialValues={{ ...initialValues, email }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormFields />
            <SubmitButton loading={isSubmitting} label={t("signin")} />
          </Form>
        )}
      </Formik>
    </PublicPageWrapper>
  );
};

export default LoginPage;
