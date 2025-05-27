import type { FormData } from "../../schemas/formSchema"
import { FormSection } from "../../components/FormSection";
import { SectionTitle } from "../../components/SectionTitle";

type Props = {
  data: FormData;
};

export const OutputPreview = ({ data }: Props) => {
  return (
    <FormSection>
      <SectionTitle text="Submitted JSON Output" level="h3" />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </FormSection>
  );
};
