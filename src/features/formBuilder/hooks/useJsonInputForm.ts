import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jsonInputSchema, defaultJsonInput, type JsonInputFormValues } from "../../../schemas/jsonInputSchema";

/**
 * Initializes the JSON input form with validation and default values.
 */
export const useJsonInputForm = () => {
  return useForm<JsonInputFormValues>({
    resolver: zodResolver(jsonInputSchema),
    defaultValues: {
      jsonInput: defaultJsonInput
    },
    mode: "onChange"
  });
};
