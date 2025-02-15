import { emailRegex, passwordRegex } from "utils/regrex";

export const baseUserSchema: any = [
  {
    field: "email",
    label: "Email",
    type: "text",
    colSpan: 12,
    regex: emailRegex,
    errorMessage: "Please provide valid email address.",
  },
  {
    field: "password",
    label: "Password",
    type: "password",
    colSpan: 12,
    regex: passwordRegex,
    errorMessage:
      "Password must be at least 8 characters and include a letter, a number, and a special character.",
  },
];
export const userSchema: any = [
  

  ...baseUserSchema,

  {
    label: "Signup",
    field: "submit",
    type: "button",
    colSpan: 12,
  },
];

export const signinSchema = [
  ...baseUserSchema,
  {
    label: "Signin",
    field: "submit",
    type: "button",
    colSpan: 12,
  },
];
