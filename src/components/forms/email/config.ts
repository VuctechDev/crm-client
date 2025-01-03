import * as Yup from "yup";

const dev = import.meta.env.DEV;

export const initialValues = dev
  ? {
      emailFrom: "",
      emailTo: "",
      tags: [],
      template: "",
      signature: "Default",
      subject: "New Subject",
      body: "",
    }
  : {
      emailFrom: "",
      emailTo: "",
      tags: [],
      template: "",
      signature: "Default",
      subject: "",
      body: "",
    };

export type InitialValues = typeof initialValues;

export const validationSchema = Yup.object().shape({
  emailFrom: Yup.string().required("requiredField").max(50, "max50char"),
  // to: Yup.string()
  //   .required("requiredField")
  //   .max(60, "max60char")
  //   .email("invalidEmail"),
  body: Yup.string().required("requiredField").max(3000, "max3000char"),
  subject: Yup.string().required("requiredField").max(150, "max150char"),
  // port: Yup.number().required("requiredField").max(99999, "max40char"),
});
