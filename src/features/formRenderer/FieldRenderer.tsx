import { fieldTypes, type FormData, type FormField } from "../../schemas/formSchema";
import { TextFieldRenderer } from "./fields/TextFieldRenderer";
import { TextareaFieldRenderer } from "./fields/TextareaFieldRenderer";
import { CheckboxFieldRenderer } from "./fields/CheckboxFieldRenderer";
import { DropdownFieldRenderer } from "./fields/DropdownFieldRenderer";
import { RadioFieldRenderer } from "./fields/RadioFieldRenderer";
import { FormSection } from "../../components/FormSection";
import { SectionTitle } from "../../components/SectionTitle";
import { useWatch } from "react-hook-form";
import { isGroupVisible } from "../../lib/isGroupVisible";
import { Stack } from "@mui/material";

type Props = {
  field: FormField;
};

/**
 * Renders the appropriate field component based on its type or group.
 */
export const FieldRenderer = ({ field }: Props) => {
  const values = useWatch<FormData>();
  // GROUP field (recursive render)
  if ("group" in field) {
    return isGroupVisible(field, values) ? (
      <FormSection>
        <SectionTitle text={field.group} level="h4" />
        <Stack spacing={2}>
          {field.fields.map((subField, idx) => (
            <FieldRenderer key={idx} field={subField} />
          ))}
        </Stack>
      </FormSection>
    ) : null;
  }

  // BASE field (switch by type)
  switch (field.type) {
    case fieldTypes.Values.text:
      return <TextFieldRenderer field={field} />;
    case fieldTypes.Values.textarea:
      return <TextareaFieldRenderer field={field} />;
    case fieldTypes.Values.dropdown:
      return <DropdownFieldRenderer field={field} />;
    case fieldTypes.Values.checkbox:
      return <CheckboxFieldRenderer field={field} />;
    case fieldTypes.Values.radio:
      return <RadioFieldRenderer field={field} />;
    default:
      return null;
  }
};
