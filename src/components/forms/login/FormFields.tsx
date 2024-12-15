import React, { FC, ReactElement } from "react";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import TextField from "../fields/TextField";
import PasswordField from "../fields/PasswordField";
import FieldLabel from "../fields/FieldLabel";
import { InitialValues } from "@/pages/LoginPage";

type Keys = "email" | "password";

interface FormFieldsProps {}

const FormFields: FC<FormFieldsProps> = (): ReactElement => {
  const { touched, errors, getFieldProps } = useFormikContext<InitialValues>();
  const { t } = useTranslation();

  const getErrorMessage = (name: Keys) => {
    if (touched[name] && errors[name]) {
      return t(errors[name] as string);
    }
    return "";
  };

  return (
    <Grid container rowGap={1}>
      <Grid xs={12} item>
        <FieldLabel label="email" />
        <TextField
          elementProps={{ ...getFieldProps("email") }}
          error={getErrorMessage("email")}
        />
      </Grid>
      <PasswordField error={getErrorMessage("password")} />
    </Grid>
  );
};

export default FormFields;
