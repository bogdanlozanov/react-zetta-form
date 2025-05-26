import { Controller, type Control } from "react-hook-form";
import { TextField, Box, useTheme } from "@mui/material";
import { FormErrorMessage } from "../../components/FormErrorMessage";
import type { JsonInputFormValues } from "../../schemas/jsonInputSchema";

type Props = {
  control: Control<JsonInputFormValues>;
};

export const JsonInputField = ({ control }: Props) => {
  const theme = useTheme();

  return (
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
            minRows={10}
            maxRows={20}
            error={!!fieldState.error}
            sx={{
              bgcolor: theme.palette.grey[50],
              "& .MuiInputBase-root": {
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.fontSize,
                lineHeight: 1.6
              }
            }}
          />
          <FormErrorMessage message={fieldState.error?.message} />
        </Box>
      )}
    />
  );
};
