import { useState } from "react";
import { useJsonInputForm } from "../features/formBuilder/hooks/useJsonInputForm";
import { useFormBuilder } from "../features/formRenderer/hooks/useFormBuilder";
import type { FormSchema } from "../schemas/formSchema";

/**
 * Centralized logic hook for orchestrating schema input and form output.
 */
export const useAppLogic = () => {
  const form = useJsonInputForm();
  const { formSchema } = useFormBuilder(form);
  const [formOutput, setFormOutput] = useState<FormSchema | null>(null);

  const handleSubmit = (data: any) => {
    setFormOutput(data);
  };

  return {
    form,
    formSchema,
    formOutput,
    handleSubmit
  };
};
