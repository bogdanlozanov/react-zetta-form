import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormErrorMessage } from "../../../components/FormErrorMessage";
import type { DropdownField } from "../../../schemas/formSchema";

type Props = {
  field: DropdownField;
};

/**
 * Renders a dropdown/select field.
 */
export const DropdownFieldRenderer = ({ field }: Props) => {
  const { control } = useFormContext();

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>

      <Controller
        name={field.name}
        control={control}
        render={({ field: controllerField, fieldState }) => (
          <>
            <Select
              labelId={`${field.name}-label`}
              {...controllerField}
              value={controllerField.value || ""}
              onChange={(e: SelectChangeEvent) => controllerField.onChange(e.target.value)}
              label={field.label}
              error={!!fieldState.error}
            >
              <MenuItem value="" disabled>
                -- Select an option --
              </MenuItem>
              {field.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <FormErrorMessage message={fieldState.error?.message} />
          </>
        )}
      />
    </FormControl>
  );
};
