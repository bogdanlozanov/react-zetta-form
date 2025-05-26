import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormErrorMessage } from "../../../components/FormErrorMessage";
import type { RadioField } from "../../../schemas/formSchema";

type Props = {
  field: RadioField;
};

/**
 * Renders a radio button group.
 */
export const RadioFieldRenderer = ({ field }: Props) => {
  const { control } = useFormContext();

  return (
    <FormControl component="fieldset" fullWidth>
      <FormLabel component="legend">{field.label}</FormLabel>
      <Controller
        name={field.name}
        control={control}
        render={({ field: controllerField, fieldState }) => (
          <>
            <RadioGroup
              {...controllerField}
              value={controllerField.value || ""}
              onChange={(e) => controllerField.onChange(e.target.value)}
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
