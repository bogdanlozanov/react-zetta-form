import { Controller, useFormContext } from "react-hook-form";
import { TextField, Box } from "@mui/material";
import { FormErrorMessage } from "../../../components/FormErrorMessage";
import type { FormData, TextareaField } from "../../../schemas/formSchema";
import { getValidationRules } from "../../../lib/getValidationRules";

type Props = {
  field: TextareaField;
};

/**
 * Renders a multiline textarea input.
 */
export const TextareaFieldRenderer = ({ field }: Props) => {
  const { control } = useFormContext<FormData>();

  return (
    <Controller
      name={field.name}
      control={control}
      rules={getValidationRules({
        required: field.required,
        validation: field.validation
      })}
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
