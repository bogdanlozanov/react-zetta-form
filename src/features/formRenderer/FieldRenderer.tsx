import type { FormField } from "../../schemas/formSchema";
import { TextFieldRenderer } from "./fields/TextFieldRenderer";
import { TextareaFieldRenderer } from "./fields/TextareaFieldRenderer";
import { CheckboxFieldRenderer } from "./fields/CheckboxFieldRenderer";
import { DropdownFieldRenderer } from "./fields/DropdownFieldRenderer";
import { RadioFieldRenderer } from "./fields/RadioFieldRenderer";
import { ValidatedTextFieldRenderer } from "./fields/ValidatedTextFieldRenderer";
import { FormSection } from "../../components/FormSection";
import { SectionTitle } from "../../components/SectionTitle";

type Props = {
  field: FormField;
};

/**
 * Renders the appropriate field component based on its type or group.
 */
export const FieldRenderer = ({ field }: Props) => {
  // GROUP field (recursive render)
  if ("group" in field) {
    const shouldShow = true; // TODO: implement visibleIf logic later

    if (!shouldShow) return null;

    return (
      <FormSection>
        <SectionTitle text={field.group} level="h4" />
        {field.fields.map((subField, idx) => (
          <FieldRenderer key={idx} field={subField} />
        ))}
      </FormSection>
    );
  }

  // BASE field (switch by type)
  switch (field.type) {
    case "text":
      return <TextFieldRenderer field={field} />;
    case "textarea":
      return <TextareaFieldRenderer field={field} />;
    case "dropdown":
      return <DropdownFieldRenderer field={field} />;
    case "checkbox":
      return <CheckboxFieldRenderer field={field} />;
    case "radio":
      return <RadioFieldRenderer field={field} />;
    case "validatedText":
      return <ValidatedTextFieldRenderer field={field} />;
    default:
      return null;
  }
};
