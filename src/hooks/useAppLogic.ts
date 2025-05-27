import { useState } from "react";
import { useJsonInputForm } from "../features/formBuilder/hooks/useJsonInputForm";
import { useFormBuilder } from "../features/formRenderer/hooks/useFormBuilder";
import type { FormData } from "../schemas/formSchema";
import { buildFormOutput } from "../lib/buildFormOutput";

/**
 * Centralized logic hook for orchestrating schema input and form output.
 */
export const useAppLogic = () => {
  const form = useJsonInputForm();
  const [formOutput, setFormOutput] = useState<FormData | null>(null);
  const { formSchema, renderedForm } = useFormBuilder(form, setFormOutput);

  const handleSubmit = (data: FormData) => {
    if (formSchema) {
      const nestedOutput = buildFormOutput(formSchema.fields, data);
      setFormOutput(nestedOutput);
    }
  };

  return {
    form,
    formSchema,
    formOutput,
    handleSubmit,
    renderedForm
  };
};
