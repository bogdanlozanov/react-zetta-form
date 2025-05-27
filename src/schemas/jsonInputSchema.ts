import { z, ZodIssueCode } from "zod";
import { parseAndValidateJson } from "../lib/parseAndValidateJson";

/**
 * JSON schema for the formBuilder input field.
 * Uses superRefine to deeply validate JSON syntax and structure.
 */
export const jsonInputSchema = z.object({
  jsonInput: z.string().min(1, "JSON input is required").superRefine((val, ctx) => {
    const result = parseAndValidateJson(val);
    if (!result.valid) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: result.error
      });
    }
  })
});

export const defaultJsonInput = JSON.stringify(
  {
    "group": "Basic Info",
    "fields": [
      {
        "name": "firstName",
        "label": "First Name",
        "type": "text",
        "required": true
      },
      {
        "name": "bio",
        "label": "Bio",
        "type": "textarea"
      },
      {
        "name": "country",
        "label": "Country",
        "type": "dropdown",
        "options": ["USA", "Canada", "Germany"]
      },
      {
        "name": "terms",
        "label": "Accept Terms",
        "type": "checkbox"
      },
      {
        "name": "gender",
        "label": "Gender",
        "type": "radio",
        "options": ["Male", "Female", "Other"]
      }
    ]
  },
  null,
  2
);

export type JsonInputFormValues = z.infer<typeof jsonInputSchema>;
