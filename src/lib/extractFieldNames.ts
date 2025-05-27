import type { FormField } from "../schemas/formSchema";

export const extractFieldNames = (fields: FormField[]): string[] => {
  let names: string[] = [];

  for (const field of fields) {
    if ("group" in field) {
      names = names.concat(extractFieldNames(field.fields));
    } else {
      names.push(field.name);
    }
  }

  return names;
};
