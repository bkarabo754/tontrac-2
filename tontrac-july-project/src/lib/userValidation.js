// lib/userValidation.js

import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(
      /^(\+?\d{1,4}[\s-]?)?\(?[\d\s-]{1,5}\)?[\s-]?\d{1,5}[\s-]?\d{1,9}$/,
      "Invalid phone number"
    )
    .required("Phone number is required"),
  website: yup.string().url("Invalid URL").required("Website is required"),
  company_name: yup.string().required("Company name is required"),
  role: yup.string().required("Role is required"),
});
