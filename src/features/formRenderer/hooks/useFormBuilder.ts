import { useState } from "react";
import { parseAndValidateJson } from "../../../lib/parseAndValidateJson";
import type { UseFormReturn } from "react-hook-form";
import type { JsonInputFormValues } from "../../../schemas/jsonInputSchema";
import type { FormSchema } from "../../../schemas/formSchema";
import { useDebouncedEffect } from "../../../hooks/useDebouncedEffect";

/**
 * Renders the full form dynamically based on parsed JSON schema.
 */
export const useFormBuilder = (form: UseFormReturn<JsonInputFormValues>) => {
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [lastValidJson, setLastValidJson] = useState<string>("");

  const jsonInput = form.watch("jsonInput");

  useDebouncedEffect(() => {
    if (!jsonInput || jsonInput.trim() === "") return;
  
    const result = parseAndValidateJson(jsonInput);
    if (result.valid && jsonInput !== lastValidJson) {
      setLastValidJson(jsonInput);
      setFormSchema(result.data);
    }
  }, [jsonInput], 400);

  return {
    formSchema
  };
};
