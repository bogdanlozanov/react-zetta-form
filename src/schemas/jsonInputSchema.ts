import { z } from "zod";

export const jsonInputSchema = z.object({
  jsonInput: z.string().min(1)
});

export type JsonInputFormValues = z.infer<typeof jsonInputSchema>;
