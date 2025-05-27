import { z } from "zod";

// Field types enum
export const fieldTypes = z.enum([
  "text",
  "textarea",
  "dropdown",
  "checkbox",
  "radio"
]);

// Shared validation rules (optional per field)
export const validationSchema = z.object({
  pattern: z.string().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional()
});

// BaseField (for all input types)
const baseFieldShape = {
  name: z.string(),
  label: z.string(),
  type: fieldTypes,
  required: z.boolean().optional(),
};

export const textFieldSchema = z.object({
  ...baseFieldShape,
  type: z.literal("text"),
  validation: validationSchema.optional()
});

export const textareaFieldSchema = z.object({
  ...baseFieldShape,
  type: z.literal("textarea"),
  validation: validationSchema.optional()
});

export const checkboxFieldSchema = z.object({
  ...baseFieldShape,
  type: z.literal("checkbox"),
});

export const dropdownFieldSchema = z.object({
  ...baseFieldShape,
  type: z.literal("dropdown"),
  options: z.array(z.string()).min(1, "Dropdown must have at least one option")
});

export const radioFieldSchema = z.object({
  ...baseFieldShape,
  type: z.literal("radio"),
  options: z.array(z.string()).min(1, "Radio group must have at least one option")
});

export const baseFieldSchema = z.union([
  textFieldSchema,
  textareaFieldSchema,
  checkboxFieldSchema,
  dropdownFieldSchema,
  radioFieldSchema
]);

export type BaseField = z.infer<typeof baseFieldSchema>;
export type TTextField = z.infer<typeof textFieldSchema>;
export type TextareaField = z.infer<typeof textareaFieldSchema>;
export type CheckboxField = z.infer<typeof checkboxFieldSchema>;
export type DropdownField = z.infer<typeof dropdownFieldSchema>;
export type RadioField = z.infer<typeof radioFieldSchema>;
export type ValidationFieldRules = z.infer<typeof validationSchema>;


// Recursive GroupField
export type GroupField = {
  group: string;
  dependsOn?: string;
  dependsOnValue?: string;
  fields: FormField[];
};

export type FormField = BaseField | GroupField;

export const groupFieldSchema: z.ZodType<GroupField> = z.lazy(() =>
  z.object({
    group: z.string(),
    dependsOn: z.string().optional(),
    dependsOnValue: z.string().optional(),
    fields: z.array(formFieldSchema)
  })
);

// Final form field union
export let formFieldSchema: z.ZodType<FormField> = z.union([
  baseFieldSchema,
  groupFieldSchema
]);

// Full form schema
export const formSchema = z.object({
  group: z.string(),
  fields: z.array(formFieldSchema)
});


// Output data structure
export type FormSchema = z.infer<typeof formSchema>;

export type FormData = {
  [key: string]: string | boolean | string[] | number | FormData | undefined;
};
