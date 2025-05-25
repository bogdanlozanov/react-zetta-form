import { z } from "zod";

// Define the reusable field type enum
export const fieldTypes = z.enum([
  "text",
  "textarea",
  "dropdown",
  "checkbox",
  "radio",
  "validatedText"
]);

// Define the base field schema
export const baseFieldSchema = z.object({
  name: z.string().min(1, "Missing field name"),
  label: z.string().min(1, "Missing field label"),
  type: fieldTypes,
  required: z.boolean().optional(),
  validation: z
    .object({
      pattern: z.string().optional(),
      dependsOn: z.string().optional(),
      dependsOnValue: z.string().optional()
    })
    .optional()
});

// Create a recursive TypeScript type for group fields
export type FormField = z.infer<typeof baseFieldSchema> | {
  group: string;
  visibleIf?: {
    field: string;
    value: string;
  };
  fields: FormField[]; // <- recursion here
};

// Declare a placeholder variable for the recursive schema
let formFieldSchema: z.ZodType<FormField>;

// Define group schema using z.lazy to break the circular dependency
const groupFieldSchema: z.ZodType<FormField> = z.object({
  group: z.string(),
  visibleIf: z
    .object({
      field: z.string(),
      value: z.string()
    })
    .optional(),
  fields: z.lazy(() => z.array(formFieldSchema)) // recursion here
});

// Finalize the formFieldSchema union
formFieldSchema = z.union([baseFieldSchema, groupFieldSchema]);

// Define the full form schema
export const formSchema = z.object({
  fields: z.array(formFieldSchema).min(1, "At least one field is required")
});

//  Export strongly typed FormSchema and BaseField
export type FormSchema = z.infer<typeof formSchema>;
export type BaseField = z.infer<typeof baseFieldSchema>;
