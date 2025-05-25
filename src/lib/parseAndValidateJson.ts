import { ZodError, ZodIssueCode } from "zod";
import { formSchema } from "../schemas/formSchema";
import type { FormSchema } from "../schemas/formSchema";
import { INVALID_SYNTAX_MESSAGE, formatZodIssuePath } from "../constants/errors";

/**
 * Parses and validates a stringified JSON input using the form schema.
 * Returns either a parsed and validated object or a formatted error message.
 */
export const parseAndValidateJson = (
  input: string
): { valid: true; data: FormSchema } | { valid: false; error: string } => {
  try {
    // Attempt to parse the input string to JSON
    const parsed = JSON.parse(input);

    // Validate the parsed object against the Zod form schema
    const data = formSchema.parse(parsed);

    // If parsing and validation pass, return the data as valid
    return { valid: true, data };
  } catch (err) {
    // Handle Zod-specific validation errors
    if (err instanceof ZodError) {
      const issue = err.issues[0]; // We show only the first issue for now

      // Special case: handle errors from union types (like `z.union`)
      // When Zod can't determine which branch matches, it stores sub-errors
      if (issue.code === ZodIssueCode.invalid_union) {
        const unionErrors = issue.unionErrors?.[0]?.issues;

        // Show the first sub-issue inside the union error, if available
        if (unionErrors?.length) {
          const subIssue = unionErrors[0];
          return {
            valid: false,
            error: `${formatZodIssuePath(subIssue.path)}: ${subIssue.message}`
          };
        }
      }

      // Default case: return the top-level issue with formatted path
      return {
        valid: false,
        error: `${formatZodIssuePath(issue.path)}: ${issue.message}`
      };
    }

    // Catch any other parsing error (invalid JSON syntax)
    return { valid: false, error: INVALID_SYNTAX_MESSAGE };
  }
};
