import type { FormData, FormField } from "../schemas/formSchema";

export const buildFormOutput = (fields: FormField[], values: FormData): FormData => {
  const result: FormData = {};

  for (const field of fields) {
    if ("group" in field) {
      const groupData = buildFormOutput(field.fields, values);
      result[field.group] = groupData;
    } else {
      result[field.name] = values[field.name];
    }
  }

  return result;
};
