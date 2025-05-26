import { z } from "zod";

// ENUM: Reusable field types
export const fieldTypes = z.enum([
  "text",
  "textarea",
  "dropdown",
  "checkbox",
  "radio",
  "validatedText"
]);

// Base schema shared by all fields
const base = z.object({
  name: z.string().min(1, "Missing field name"),
  label: z.string().min(1, "Missing field label"),
  required: z.boolean().optional(),
  validation: z
    .object({
      pattern: z.string().optional(),
      dependsOn: z.string().optional(),
      dependsOnValue: z.string().optional()
    })
    .optional()
});

// Discriminated field types
const textField = base.extend({ type: z.literal("text") });
const textareaField = base.extend({ type: z.literal("textarea") });
const checkboxField = base.extend({ type: z.literal("checkbox") });
const validatedTextField = base.extend({ type: z.literal("validatedText") });

export type DropdownField = z.infer<typeof dropdownField>;
export type RadioField = z.infer<typeof radioField>;

const dropdownField = base.extend({
  type: z.literal("dropdown"),
  options: z.array(z.string()).min(1, "Dropdown requires options")
});

const radioField = base.extend({
  type: z.literal("radio"),
  options: z.array(z.string()).min(1, "Radio group requires options")
});

// Union of all base fields
export const baseFieldSchema = z.discriminatedUnion("type", [
  textField,
  textareaField,
  checkboxField,
  validatedTextField,
  dropdownField,
  radioField
]);

export type BaseField = z.infer<typeof baseFieldSchema>;

// Group schema (recursive)
export type FormField = BaseField | {
  group: string;
  visibleIf?: {
    field: string;
    value: string;
  };
  fields: FormField[];
};

// Recursive Zod schema for groups
let formFieldSchema: z.ZodType<FormField>;

const groupFieldSchema: z.ZodType<FormField> = z.object({
  group: z.string(),
  visibleIf: z
    .object({
      field: z.string(),
      value: z.string()
    })
    .optional(),
  fields: z.lazy(() => z.array(formFieldSchema))
});

formFieldSchema = z.union([baseFieldSchema, groupFieldSchema]);

// Final form schema
export const formSchema = z.object({
  fields: z.array(formFieldSchema).min(1, "At least one field is required")
});

export type FormSchema = z.infer<typeof formSchema>;

export type FormData = {
  [key: string]: string | boolean | string[] | number | FormData | undefined;
};
