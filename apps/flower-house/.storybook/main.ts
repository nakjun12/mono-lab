import type { StorybookConfig } from "@storybook/nextjs";
import path, { dirname, join } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-viewport"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-designs"),
    {
      // @storybook/addon-storysource 설정을 객체 형태로 추가합니다.
      name: getAbsolutePath("@storybook/addon-storysource"),
      options: {
        rule: {
          include: [path.resolve(__dirname, "../app")]
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false } // Prettier 설정을 지정합니다.
        }
      }
    }
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  staticDirs: ["../public"]
};
export default config;

//폰트 적용
//https://storybook.js.org/docs/configure/images-and-assets
//FIGMA 적용
//https://storybookjs.github.io/addon-designs/?path=/docs/docs-quick-start--docs
//app 라우터 이슈
//https://github.com/storybookjs/storybook/issues/24722
//절대경로 이슈
//https://github.com/storybookjs/storybook/issues/21901
