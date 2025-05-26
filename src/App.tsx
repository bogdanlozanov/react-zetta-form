import { DynamicForm } from "./features/formRenderer/DynamicForm";
import { FormBuilderInput } from "./features/formBuilder/FormBuilderInput";
import { PageContainer } from "./layouts/PageContainer";
import { SectionTitle } from "./components/SectionTitle";
import { useAppLogic } from "./hooks/useAppLogic";
import { FormSection } from "./components/FormSection";

function App() {
  const { form, formSchema, formOutput, handleSubmit } = useAppLogic();

  return (
    <PageContainer>
      <SectionTitle text="Dynamic Form Builder" level="h1" />
      <FormBuilderInput control={form.control} />

      {formSchema && (
        <DynamicForm schema={formSchema} onSubmit={handleSubmit} />
      )}

      {formOutput && (
        <FormSection>
          <SectionTitle text="Submitted JSON Output" level="h3" />
          <pre>{JSON.stringify(formOutput, null, 2)}</pre>
        </FormSection>

      )}
    </PageContainer>
  );
}

export default App;
