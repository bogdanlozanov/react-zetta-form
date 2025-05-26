import { Controller, useFormContext } from "react-hook-form";
import { TextField, Box } from "@mui/material";
import { FormErrorMessage } from "../../../components/FormErrorMessage";
import type { BaseField } from "../../../schemas/formSchema";

type Props = {
  field: BaseField;
};

/**
 * Renders a text field with optional custom validation pattern.
 */
export const ValidatedTextFieldRenderer = ({ field }: Props) => {
  const { control } = useFormContext();

  const pattern = field.validation?.pattern
    ? new RegExp(field.validation.pattern)
    : null;

  return (
    <Controller
      name={field.name}
      control={control}
      rules={{
        validate: pattern
          ? (value) =>
              pattern.test(value || "") ||
              "Value does not match the required pattern"
          : undefined
      }}
      render={({ field: controllerField, fieldState }) => (
        <Box>
          <TextField
            {...controllerField}
            label={field.label}
            fullWidth
            variant="outlined"
            error={!!fieldState.error}
          />
          <FormErrorMessage message={fieldState.error?.message} />
        </Box>
      )}
    />
  );
};
