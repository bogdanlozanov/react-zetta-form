import { type UseFormReturn } from "react-hook-form";
import { Stack } from "@mui/material";
import type { FormSchema, FormData } from "../../schemas/formSchema";
import { FieldRenderer } from "./FieldRenderer";
import { PrimaryButton } from "../../components/PrimaryButton";
import { FormSection } from "../../components/FormSection";
import { SectionTitle } from "../../components/SectionTitle";
import { useAutofillHandler } from "./hooks/useAutofillHandler";

type Props = {
  schema: FormSchema;
  onSubmit: (data: FormData) => void;
  form: UseFormReturn<FormData, any, FormData>
};

/**
 * Renders the full form dynamically based on parsed JSON schema.
 */
export const DynamicForm = ({ schema, onSubmit, form }: Props) => {

  const handleSubmit = form.handleSubmit(onSubmit);
  useAutofillHandler(schema.fields);

  return (
    <FormSection>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <SectionTitle text={schema.group} level="h3" />
            {schema.fields.map((field, idx) => (
              <FieldRenderer key={idx} field={field} />
            ))}
            <PrimaryButton type="submit">Submit</PrimaryButton>
          </Stack>
        </form>
    </FormSection>
  );
};
