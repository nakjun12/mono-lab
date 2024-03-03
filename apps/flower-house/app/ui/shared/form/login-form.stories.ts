import type { Meta, StoryObj } from "@storybook/react";
import LoginForm from "./login-form";

const meta = {
  title: "Example/LoginForm",
  component: LoginForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"]
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

//피그마 테스트
export const Default: Story = {
  args: {},
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/laGITrcCpUbh79QOTJoShY/flowermap?type=design&node-id=96%3A1047&mode=design&t=SCUDujqmnOSqR8Yt-1"
    }
  }
};
