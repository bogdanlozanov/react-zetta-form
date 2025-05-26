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
    fields: [
      { name: "email", label: "Email", type: "text" }
    ]
  },
  null,
  2
);

export type JsonInputFormValues = z.infer<typeof jsonInputSchema>;
