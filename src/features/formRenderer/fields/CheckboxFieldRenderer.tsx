import { Controller, useFormContext } from "react-hook-form";
import {
  Checkbox,
  FormControlLabel,
  Box
} from "@mui/material";
import { FormErrorMessage } from "../../../components/FormErrorMessage";
import type { BaseField } from "../../../schemas/formSchema";

type Props = {
  field: BaseField;
};

/**
 * Renders a checkbox field.
 */
export const CheckboxFieldRenderer = ({ field }: Props) => {
  const { control } = useFormContext();

  return (
    <Box>
      <Controller
        name={field.name}
        control={control}
        render={({ field: controllerField, fieldState }) => (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  {...controllerField}
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
