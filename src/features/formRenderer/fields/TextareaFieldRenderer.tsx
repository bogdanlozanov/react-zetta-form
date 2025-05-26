import { Controller, useFormContext } from "react-hook-form";
import { TextField, Box } from "@mui/material";
import { FormErrorMessage } from "../../../components/FormErrorMessage";
import type { BaseField } from "../../../schemas/formSchema";

type Props = {
  field: BaseField;
};

/**
 * Renders a multiline textarea input.
 */
export const TextareaFieldRenderer = ({ field }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: controllerField, fieldState }) => (
        <Box>
          <TextField
            {...controllerField}
            label={field.label}
            multiline
            fullWidth
            minRows={4}
            maxRows={10}
            variant="outlined"
            error={!!fieldState.error}
          />
          <FormErrorMessage message={fieldState.error?.message} />
        </Box>
      )}
    />
  );
};
