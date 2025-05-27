import { DynamicForm } from "./features/formRenderer/DynamicForm";
import { FormBuilderInput } from "./features/formBuilder/FormBuilderInput";
import { PageContainer } from "./layouts/PageContainer";
import { SectionTitle } from "./components/SectionTitle";
import { useAppLogic } from "./hooks/useAppLogic";
import { OutputPreview } from "./features/formOutput/OutputPreview";

function App() {
  const { form, formSchema, formOutput, handleSubmit, renderedForm } = useAppLogic();

  return (
    <PageContainer>
      <SectionTitle text="Dynamic Form Builder" level="h1" />
      <FormBuilderInput control={form.control} />

      {formSchema && (
        <DynamicForm schema={formSchema} onSubmit={handleSubmit} form={renderedForm} />
      )}

      {formOutput && (
        <OutputPreview data={formOutput} />

      )}
    </PageContainer>
  );
}

export default App;
