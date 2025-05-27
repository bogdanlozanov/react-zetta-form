import { Controller, useFormContext } from "react-hook-form";
import {
  Checkbox,
  FormControlLabel,
  Box
} from "@mui/material";
import { FormErrorMessage } from "../../../components/FormErrorMessage";
import type { CheckboxField, FormData } from "../../../schemas/formSchema";
import { getValidationRules } from "../../../lib/getValidationRules";

type Props = {
  field: CheckboxField;
};

/**
 * Renders a checkbox field.
 */
export const CheckboxFieldRenderer = ({ field }: Props) => {
  const { control } = useFormContext<FormData>();

  return (
    <Box>
      <Controller
        name={field.name}
        control={control}
        rules={getValidationRules({
          required: field.required
        })}
        render={({ field: controllerField, fieldState }) => (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  {...controllerField}
                  disabled={!!field.autoFill}
                  checked={!!controllerField.value}
                  onChange={(e) => controllerField.onChange(e.target.checked)}
                />
              }
              label={field.label}
            />
            <FormErrorMessage message={fieldState.error?.message} />
          </>
        )}
      />
    </Box>
  );
};
