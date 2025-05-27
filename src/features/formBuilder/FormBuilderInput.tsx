import { JsonInputField } from "./JsonInputField";
import { FormSection } from "../../components/FormSection";
import { SectionTitle } from "../../components/SectionTitle";
import type { Control } from "react-hook-form";
import type { JsonInputFormValues } from "../../schemas/jsonInputSchema";

type Props = {
  control: Control<JsonInputFormValues>;
};

/**
 * Displays the JSON schema input UI.
 */
export const FormBuilderInput = ({ control }: Props) => {
  return (
    <>
      <FormSection>
        <SectionTitle text="Paste Your JSON Schema" level="h3" />
        <JsonInputField control={control} />
      </FormSection>
    </>
  );
};
