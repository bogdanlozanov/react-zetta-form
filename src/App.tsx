import { SectionTitle } from "./components/SectionTitle";
import { FormBuilderInput } from "./features/formBuilder/FormBuilderInput";
import { PageContainer } from "./layouts/PageContainer";

function App() {
  return (
    <PageContainer>
      <SectionTitle text="Dynamic Form Builder" level="h1" />
      <FormBuilderInput />
    </PageContainer>
  );
}

export default App;
