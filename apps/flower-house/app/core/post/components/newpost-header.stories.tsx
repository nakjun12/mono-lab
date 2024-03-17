import type { Meta, StoryObj } from "@storybook/react";
import NewpostHeader from "./newpost-header";

const meta = {
  title: "Example/NewpostHeader",
  component: NewpostHeader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],

  parameters: {
    nextjs: {
      appDirectory: true, // Next.js 13의 app 디렉토리 사용을 위해 true로 설정
      navigation: {
        pathname: "/your-pathname", // 원하는 경로명 설정
        query: {
          key: "value" // 필요한 쿼리 매개변수 설정
        }
      }
    }
  }
} satisfies Meta<typeof NewpostHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
