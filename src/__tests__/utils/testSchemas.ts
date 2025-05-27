import type { FormSchema } from "../../schemas/formSchema";

export const createSchemaWithField = (
  type: "text" | "textarea" | "dropdown" | "checkbox" | "radio"
): FormSchema => {
  const baseField: any = {
    name: "testField",
    label: "Test Field",
    type,
    required: true,
    autoFill: undefined,
  };

  if (type === "dropdown" || type === "radio") {
    baseField.options = ["Option A", "Option B"];
  }

  return {
    group: "Test Group",
    fields: [baseField],
  };
};