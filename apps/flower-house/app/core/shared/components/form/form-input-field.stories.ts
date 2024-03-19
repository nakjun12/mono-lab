import type { Meta, StoryObj } from "@storybook/react";
import FormInputField from "./form-Input-field";

const meta = {
  title: "Example/FormInputField",
  component: FormInputField,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"]
} satisfies Meta<typeof FormInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Placeholder"
  }
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Password"
  }
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Email"
  }
};
