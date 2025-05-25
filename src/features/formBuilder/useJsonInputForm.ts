import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseAndValidateJson } from "../../lib/parseAndValidateJson";

const defaultJson = JSON.stringify(
  {
    fields: [
      { name: "email", label: "Email", type: "text" }
    ]
  },
  null,
  2
);

// Validate the input JSON string using Zod and parse helper
const schema = z.object({
  jsonInput: z
    .string()
    .min(1, "JSON input is required")
    .superRefine((val, ctx) => {
      const result = parseAndValidateJson(val);
      if (!result.valid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: result.error
        });
      }
    })
});


export const useJsonInputForm = () => {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      jsonInput: defaultJson
    },
    mode: "onChange"
  });
};
