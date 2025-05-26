import { useEffect, useState } from "react";
import { parseAndValidateJson } from "../../../lib/parseAndValidateJson";
import type { UseFormReturn } from "react-hook-form";
import type { JsonInputFormValues } from "../../../schemas/jsonInputSchema";
import type { FormSchema } from "../../../schemas/formSchema";

let debounceTimer: ReturnType<typeof setTimeout>;

/**
 * Renders the full form dynamically based on parsed JSON schema.
 */
export const useFormBuilder = (form: UseFormReturn<JsonInputFormValues>) => {
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [lastValidJson, setLastValidJson] = useState<string>("");

  const jsonInput = form.watch("jsonInput");

  useEffect(() => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      if (!jsonInput || jsonInput.trim() === "") return;

      const result = parseAndValidateJson(jsonInput);
      if (result.valid) {
        // Avoid unnecessary re-render if JSON is unchanged
        if (jsonInput !== lastValidJson) {
          setLastValidJson(jsonInput);
          setFormSchema(result.data);
        }
      }
    }, 400);

    return () => clearTimeout(debounceTimer);
  }, [jsonInput]);

  return {
    formSchema
  };
};
