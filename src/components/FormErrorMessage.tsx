import { FormHelperText } from "@mui/material";

type Props = {
  message?: string;
};

export const FormErrorMessage = ({ message }: Props) =>
  message ? <FormHelperText error>{message}</FormHelperText> : null;
