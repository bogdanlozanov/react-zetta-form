import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormErrorMessage } from "../../../components/FormErrorMessage";
import type { FormData, RadioField } from "../../../schemas/formSchema";
import { getValidationRules } from "../../../lib/getValidationRules";

type Props = {
  field: RadioField;
};

/**
 * Renders a radio button group.
 */
export const RadioFieldRenderer = ({ field }: Props) => {
  const { control } = useFormContext<FormData>();

  return (
    <FormControl component="fieldset" fullWidth>
      <FormLabel component="legend">{field.label}</FormLabel>
      <Controller
        name={field.name}
        control={control}
        rules={getValidationRules({
          required: field.required
        })}
        render={({ field: controllerField, fieldState }) => (
          <>
            <RadioGroup
              {...controllerField}
              value={controllerField.value || ""}
              onChange={(e) => controllerField.onChange(e.target.value)}
              aria-disabled={!!field.autoFill}
            >
              {field.options.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>

            <FormErrorMessage message={fieldState.error?.message} />
          </>
        )}
      />
    </FormControl>
  );
};
