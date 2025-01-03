import React, { FC, ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { useFormikContext } from "formik";
import TextField from "../fields/TextField";
import { InitialValues, initialValues } from "./config";
import FieldLabel from "../fields/FieldLabel";
import ColorPicker from "../fields/ColorPicker";

type Keys = "tag" | "description" | "color";

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

  const fields = useMemo(() => Object.keys(initialValues) as Keys[], []);

  return (
    <Grid container columnSpacing={4} rowGap={2}>
      {fields.map((name) => (
        <Grid xs={12} item key={name}>
          <FieldLabel label={name} />

          {name === "color" ? (
            <ColorPicker
              elementProps={{ ...getFieldProps(name) }}
              error={getErrorMessage(name)}
            />
          ) : (
            <TextField
              elementProps={{ ...getFieldProps(name) }}
              error={getErrorMessage(name)}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default FormFields;
