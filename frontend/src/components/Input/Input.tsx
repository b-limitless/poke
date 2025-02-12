import React from "react";
import { TextField } from "@mui/material";
import { style } from "./style";

interface InputInterfae {
  [x: string]: any;
}

export default function Input({ ...rest }: InputInterfae) {
  return <TextField sx={style} size="medium" {...rest} ></TextField>;
}
