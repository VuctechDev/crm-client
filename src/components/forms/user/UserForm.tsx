import React, { FC, ReactElement } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import FormFields from "./FormFields";
import { phone } from "phone";
import SubmitButton from "../fields/SubmitButton";
import { useCreateUser, useGetUser, useUpdateUser } from "@/lib/api/user/queries";

const dev = import.meta.env.DEV;

export const initialValues = dev
  ? {
      firstName: "",
      lastName: "",
      phone: "+33642792263",
      email: "",
      address: "",
      city: "",
      zip: "",
      country: { name: "", iso3: "", iso: "", phoneCode: "" },
    }
  : {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      zip: "",
      country: { name: "", iso3: "", iso: "", phoneCode: "" },
    };

export type InitialValues = typeof initialValues;

const validationSchema = Yup.object().shape({
  email: Yup.string().required("requiredField").email("invalidEmail"),
  firstName: Yup.string().required("requiredField").max(40, "max40char"),
  lastName: Yup.string().required("requiredField").max(40, "max40char"),
  address: Yup.string().required("requiredField").max(50, "max50char"),
  city: Yup.string().required("requiredField").max(50, "max50char"),
  zip: Yup.string().required("requiredField").max(12, "max12char"),
  country: Yup.object().required("requiredField"),
  phone: Yup.string()
    .required("requiredField")
    .test(
      "phoneValidation",
      "invalidPhoneNumber",
      (value?: string) => phone(value ?? "").isValid
    ),
});

interface UserFormProps {}

const UserForm: FC<UserFormProps> = (): ReactElement => {
  const { data: user } = useGetUser();
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: updateUser } = useUpdateUser();
  const { t } = useTranslation();

  const handleSubmit = async (values: InitialValues) => {
    try {
      if (location.pathname === "/onboarding/user") {
        await createUser({ ...values, country: values?.country?.iso3 });
      } else {
        await updateUser({ ...values, country: values?.country?.iso3 });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Typography variant="h6">{t("personalInfo")}</Typography>
      <Formik
        initialValues={{
          ...initialValues,
          email: user?.email ?? user?.username ?? "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormFields />
            <SubmitButton loading={isSubmitting} label={t("save")} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UserForm;
