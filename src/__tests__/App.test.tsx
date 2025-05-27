import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { DynamicForm } from "../features/formRenderer/DynamicForm";
import { createSchemaWithField } from "./utils/testSchemas";
import { test, expect, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";

function renderWithForm(
  schema: ReturnType<typeof createSchemaWithField>,
  onSubmit: (data: any) => void = vi.fn() // default fallback
) {
  const Wrapper = () => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <DynamicForm schema={schema} onSubmit={onSubmit} form={methods} />
      </FormProvider>
    );
  };

  return render(<Wrapper />);
}



describe("DynamicForm", () => {
  test("renders a text field", () => {
    renderWithForm(createSchemaWithField("text"));
    expect(screen.getByLabelText(/test field/i)).toBeInTheDocument();
  });

  test("renders a textarea", () => {
    renderWithForm(createSchemaWithField("textarea"));
    expect(screen.getByLabelText(/test field/i)).toBeInTheDocument();
  });

  test("renders a dropdown", () => {
    renderWithForm(createSchemaWithField("dropdown"));
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("renders a checkbox", () => {
    renderWithForm(createSchemaWithField("checkbox"));
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  test("renders radio buttons", () => {
    renderWithForm(createSchemaWithField("radio"));
    expect(screen.getAllByRole("radio")).toHaveLength(2); // We used 2 options
  });

  test("calls onSubmit with values", async () => {
    const handleSubmit = vi.fn();
    renderWithForm(createSchemaWithField("text"), handleSubmit);
  
    const user = userEvent.setup();
    const input = screen.getByLabelText(/test field/i);
    await user.type(input, "Hello!");
    await user.click(screen.getByRole("button", { name: /submit/i }));
  
    expect(handleSubmit).toHaveBeenCalledWith({ testField: "Hello!" }, expect.anything());
  });
  
});