import { Controller, type Control } from "react-hook-form";
import { TextField, Box } from "@mui/material";
import { FormErrorMessage } from "../../components/FormErrorMessage";
import type { JsonInputFormValues } from "../../schemas/jsonInputSchema";

type Props = {
  control: Control<JsonInputFormValues>;
};

export const JsonInputField = ({ control }: Props) => (
  <Controller
    name="jsonInput"
    control={control}
    render={({ field, fieldState }) => (
      <Box>
        <TextField
          {...field}
          label="Paste JSON Schema"
          multiline
          fullWidth
          minRows={6}
          maxRows={12}
          variant="outlined"
          error={!!fieldState.error}
        />
        <FormErrorMessage message={fieldState.error?.message} />
      </Box>
    )}
  />
);
