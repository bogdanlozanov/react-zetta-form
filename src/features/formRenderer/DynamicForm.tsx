import { useForm, FormProvider } from "react-hook-form";
import { Stack } from "@mui/material";
import type { FormSchema, FormData } from "../../schemas/formSchema";
import { FieldRenderer } from "./FieldRenderer";
import { PrimaryButton } from "../../components/PrimaryButton";
import { FormSection } from "../../components/FormSection";
import { SectionTitle } from "../../components/SectionTitle";

type Props = {
  schema: FormSchema;
  onSubmit: (data: FormData) => void;
};

/**
 * Renders the full form dynamically based on parsed JSON schema.
 */
export const DynamicForm = ({ schema, onSubmit }: Props) => {
  const methods = useForm<FormData>({ mode: "onChange" });

  const handleSubmit = methods.handleSubmit(onSubmit);

  return (
    <FormSection>
        <SectionTitle text="Generated Form" level="h3" />
      <FormProvider {...methods}>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {schema.fields.map((field, idx) => (
              <FieldRenderer key={idx} field={field} />
            ))}

            <PrimaryButton type="submit">Submit</PrimaryButton>
          </Stack>
        </form>
      </FormProvider>
    </FormSection>
  );
};
