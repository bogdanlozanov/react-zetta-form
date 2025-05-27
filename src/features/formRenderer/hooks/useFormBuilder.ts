import React, { useEffect, useMemo, useRef, useState } from "react";
import { parseAndValidateJson } from "../../../lib/parseAndValidateJson";
import { useForm, type UseFormReturn } from "react-hook-form";
import type { JsonInputFormValues } from "../../../schemas/jsonInputSchema";
import type { FormData, FormSchema } from "../../../schemas/formSchema";
import { useDebouncedEffect } from "../../../hooks/useDebouncedEffect";
import { extractFieldNames } from "../../../lib/extractFieldNames";

/**
 * Renders the full form dynamically based on parsed JSON schema.
 */
export const useFormBuilder = (form: UseFormReturn<JsonInputFormValues>, setFormOutput: React.Dispatch<React.SetStateAction<FormData | null>>) => {
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [lastValidJson, setLastValidJson] = useState<string>("");

  const jsonInput = form.watch("jsonInput");
  const renderedForm = useForm<FormData>({ mode: "onChange" });
  const fieldNames = useMemo(() => {
    return formSchema ? extractFieldNames(formSchema.fields) : [];
  }, [formSchema]);

  const previous = useRef<string | null>(null);
  const current = JSON.stringify(renderedForm.watch(fieldNames));

  useDebouncedEffect(() => {
    if (!jsonInput || jsonInput.trim() === "") return;

    const result = parseAndValidateJson(jsonInput);
    if (result.valid && jsonInput !== lastValidJson) {
      setLastValidJson(jsonInput);
      setFormSchema({ ...result.data });
      setFormOutput(null);
    }
  }, [jsonInput], 400);

  useEffect(() => {
    if (previous.current && previous.current !== current) {
      setFormOutput(null);
    }
    previous.current = current;
  }, [current]);

  return {
    formSchema,
    renderedForm,
  };
};
