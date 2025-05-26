import { useJsonInputForm } from "./useJsonInputForm";
import { JsonInputField } from "./JsonInputField";
import { FormSection } from "../../components/FormSection";
import { SectionTitle } from "../../components/SectionTitle";

export const FormBuilderInput = () => {
  const { control } = useJsonInputForm();

  return (
    <>
      <SectionTitle text="Paste Your JSON Schema" level="h4" />
      <FormSection>
        <JsonInputField control={control} />
      </FormSection>
    </>
  );
};
