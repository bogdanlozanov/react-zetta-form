import type { ValidationFieldRules } from "../schemas/formSchema";

type FieldValidationParams = {
  required?: boolean;
  validation?: ValidationFieldRules;
};

export const getValidationRules = ({
  required,
  validation
}: FieldValidationParams) => {
  return {
    required: required ? "This field is required" : false,
    minLength: validation?.minLength,
    maxLength: validation?.maxLength,
    pattern: validation?.pattern
      ? {
          value: new RegExp(validation.pattern),
          message: "Value does not match the expected pattern"
        }
      : undefined
  };
};
