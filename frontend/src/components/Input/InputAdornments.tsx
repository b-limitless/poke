import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormHelperText, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import * as React from "react";
import { colors } from "config/colors";
import { style } from "./style";

interface InputAdornmentsProps {
  formControlProps?: any; // You can define a more specific type if you know the structure
  label?: string; // Optional label prop
  error?: boolean; // Optional error prop
  helperText?: string; // Optional helper text prop
  [key: string]: any; // Allow other props
}

export default function InputAdornments({
  formControlProps = {},
  label,
  error,
  helperText,
  ...props
}: InputAdornmentsProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl {...formControlProps} variant="outlined" sx={{...style, marginTop: '8px'}}>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        {...props}
        id="password-field"
        type={showPassword ? "text" : "password"}
        size="medium"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {error && (
        <FormHelperText sx={{ color: colors.red }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
