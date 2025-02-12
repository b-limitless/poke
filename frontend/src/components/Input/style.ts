import { colors } from "config/colors";

export const style: any = {
  // Apply font family to the root form control and input label
  "&.MuiFormControl-root": {
    width: "100%",
    fontFamily: "Poppins, sans-serif !important",
  },
  "& .MuiInputLabel-root": {
    fontFamily: "Poppins, sans-serif !important",
  },

  // Style for the input field when focused
  "& .MuiInputBase-input": {
    borderRadius: "6px",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "24px",
    letterSpacing: "0.5px",
    color: "rgba(0, 0, 0, 0.87)",
    width: "100%",
    fontFamily: "Poppins, sans-serif !important",
  },

  // When label is focused, apply color and adjust background on focus
  "& .MuiInputLabel-root.Mui-focused": {
    color: colors.primary,
    backgroundColor: "#fff",  // Add a background to make the label shift up clearly
    padding: "0 5px",  // Optional padding adjustment to make the label shift more cleanly
  },

  // Focus state of the input underline
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: colors.lightGray,
    },
    "&:hover fieldset": {
      borderColor: colors.lightGray,
    },
    "&.Mui-focused fieldset": {
      borderWidth: "1px",
      borderColor: colors.primary,
    },
  },

  // When helper text is present, style the text
  "& .MuiFormHelperText-root": {
    fontFamily: "Poppins, sans-serif !important",
  },

  // Make sure the helper text is styled correctly
  "& .MuiFormHelperText-root.Mui-error": {
    color: colors.red,
  },
};

